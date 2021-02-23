import Server from "looker-action-hub/lib/server/server"
import * as Hub from "looker-action-hub/lib/hub"
import {SegmentAction} from "./segment"


Hub.addAction(new SegmentAction());
Server.run();