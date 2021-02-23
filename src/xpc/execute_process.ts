import * as dotenv from "dotenv"
import * as winston from "winston"

import "../segment.ts"
import * as Hub from "looker-action-hub/lib/hub"
import {SegmentAction} from "../segment"



dotenv.config()

async function execute(jsonPayload: any) {
    const req = JSON.parse(jsonPayload)
    const request = Hub.ActionRequest.fromIPC(req)
    Hub.addAction(new SegmentAction());
    console.log("riiiiiiiiii"+JSON.stringify(req));
    const action = await Hub.findAction(req.actionId, {lookerVersion: req.lookerVersion})
    return action.execute(request)
}

process.on("message", (req) => {
    execute(req)
        .then((val) => { process.send!(val)})
        .catch((err) => {
            const stringErr = JSON.stringify(err)
            winston.error("Error on child: " + stringErr)
            process.send!({success: false, message: stringErr})
        })
})
