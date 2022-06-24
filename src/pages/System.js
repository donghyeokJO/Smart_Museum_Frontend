import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { ROOT_API } from "../utils/axios";
import { Jwt } from "jsonwebtoken";

function System(){
    return (
        <div>어드민이다!</div>
    );
}

export default withRouter(System);