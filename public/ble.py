import asyncio
import uuid
import winrt.windows.devices.bluetooth.advertisement as winBLE
from winrt.windows.storage.streams import DataReader


async def discover():
    def process_eddystone(data):
        _url_prefix_scheme = [
            "http://www.",
            "https://www.",
            "http://",
            "https://",
        ]
        _url_encoding = [
            ".com/",
            ".org/",
            ".edu/",
            ".net/",
            ".info/",
            ".biz/",
            ".gov/",
            ".com",
            ".org",
            ".edu",
            ".net",
            ".info",
            ".biz",
            ".gov",
        ]
        tx_pwr = int.from_bytes([data[1]], "big", signed=True)
        if data[0] == 0x00:
            namespace_id = int.from_bytes(data[2:12], "big")
            instance_id = int.from_bytes(data[12:18], "big")
            print(
                f"\t\tEddystone UID: {namespace_id} " f"- {instance_id} \u2197 {tx_pwr}"
            )
        elif data[0] == 0x10:
            prefix = data[2]
            encoded_url = data[3:]
            full_url = _url_prefix_scheme[prefix]
            for letter in encoded_url:
                if letter < len(_url_encoding):
                    full_url += _url_encoding[letter]
                else:
                    full_url += chr(letter)
            print(f"\t\tEddystone URL: {full_url} \u2197 {tx_pwr}")

    def process_ibeacon(data, beacon_type="iBeacon"):
        beacon_uuid = uuid.UUID(bytes=bytes(data[2:18]))
        major = int.from_bytes(bytearray(data[18:20]), "big", signed=False)
        minor = int.from_bytes(bytearray(data[20:22]), "big", signed=False)
        tx_pwr = int.from_bytes([data[22]], "big", signed=True)
        print(
            f"\t\t{beacon_type}: {beacon_uuid} - {major} " f"- {minor} \u2197 {tx_pwr}"
        )

    def on_advert(sender, evt):
        for s_data_buf in evt.advertisement.data_sections:
            if s_data_buf.data_type == 0x16:
                data_reader = DataReader.from_buffer(s_data_buf.data)
                s_data = data_reader.read_bytes(s_data_buf.data.length)
                if s_data[0:2] == [0xAA, 0xFE]:
                    process_eddystone(s_data[2:])
        for m_data_buf in evt.advertisement.manufacturer_data:
            if m_data_buf.company_id == 0x004C:
                data_reader = DataReader.from_buffer(m_data_buf.data)
                m_data = data_reader.read_bytes(m_data_buf.data.length)
                if m_data[0] == 0x02:
                    process_ibeacon(m_data)
            elif m_data_buf.company_id == 0xFFFF:
                data_reader = DataReader.from_buffer(m_data_buf.data)
                m_data = data_reader.read_bytes(m_data_buf.data.length)
                if m_data[0:2] == [0xBE, 0xAC]:
                    process_ibeacon(m_data, "AltBeacon")

    watcher = winBLE.BluetoothLEAdvertisementWatcher()
    watcher.add_received(on_advert)

    watcher.start()
    await asyncio.sleep(25)
    watcher.stop()


asyncio.run(discover())
