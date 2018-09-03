/**
   Copyright 2018 June Hanabi

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

import { Component } from '@angular/core';
import { SaveFileService } from "../../data/savefile.service";

@Component({
    selector: 'screen-area-tilesets',
    templateUrl: './area-tilesets.component.pug',
    styleUrls: ['./area-tilesets.component.scss'],
})
export class AreaTilesetsComponent {

    constructor(
        public fileService: SaveFileService,
    ) { }

    get containerTileset() {
        const tileset = this.fileService.fileDataExpanded.area.tileset;
        if (tileset == "19_00_4000_45E0_1735")
            return {
                tileset: "assets/pokered-font/pic-tilesets/overworld.png",
                container: "pr-container pr-large pr-pic-overworld"
            }
        else if (tileset == "19_01_4DE0_5270_1749")
            return {
                tileset: "assets/pokered-font/pic-tilesets/reds_house.png",
                container: "pr-container pr-large pr-pic-reds_house"
            }
        else if (tileset == "1A_02_4DBF_53BF_1753")
            return {
                tileset: "assets/pokered-font/pic-tilesets/pokecenter.png",
                container: "pr-container pr-large pr-pic-pokecenter"
            }
        else if (tileset == "1A_03_63FF_69FF_1765")
            return {
                tileset: "assets/pokered-font/pic-tilesets/forest.png",
                container: "pr-container pr-large pr-pic-forest"
            }
        else if (tileset == "19_04_4DE0_5270_1749")
            return {
                tileset: "assets/pokered-font/pic-tilesets/reds_house.png",
                container: "pr-container pr-large pr-pic-reds_house"
            }
        else if (tileset == "1A_05_407F_467F_1759")
            return {
                tileset: "assets/pokered-font/pic-tilesets/gym.png",
                container: "pr-container pr-large pr-pic-gym"
            }
        else if (tileset == "1A_06_4DBF_53BF_1753")
            return {
                tileset: "assets/pokered-font/pic-tilesets/pokecenter.png",
                container: "pr-container pr-large pr-pic-pokecenter"
            }
        else if (tileset == "1A_07_407F_467F_1759")
            return {
                tileset: "assets/pokered-font/pic-tilesets/gym.png",
                container: "pr-container pr-large pr-pic-gym"
            }
        else if (tileset == "19_08_53A0_5980_1775")
            return {
                tileset: "assets/pokered-font/pic-tilesets/house.png",
                container: "pr-container pr-large pr-pic-house"
            }
        else if (tileset == "1A_09_560F_5BFF_177F")
            return {
                tileset: "assets/pokered-font/pic-tilesets/gate.png",
                container: "pr-container pr-large pr-pic-gate"
            }
        else if (tileset == "1A_0A_560F_5BFF_177F")
            return {
                tileset: "assets/pokered-font/pic-tilesets/gate.png",
                container: "pr-container pr-large pr-pic-gate"
            }
        else if (tileset == "1B_0B_7D60_7EF0_172F")
            return {
                tileset: "assets/pokered-font/pic-tilesets/underground.png",
                container: "pr-container pr-large pr-pic-underground"
            }
        else if (tileset == "1A_0C_560F_5BFF_177F")
            return {
                tileset: "assets/pokered-font/pic-tilesets/gate.png",
                container: "pr-container pr-large pr-pic-gate"
            }
        else if (tileset == "1B_0D_6390_6930_178A")
            return {
                tileset: "assets/pokered-font/pic-tilesets/ship.png",
                container: "pr-container pr-large pr-pic-ship"
            }
        else if (tileset == "19_0E_6610_6BF0_1795")
            return {
                tileset: "assets/pokered-font/pic-tilesets/ship_port.png",
                container: "pr-container pr-large pr-pic-ship_port"
            }
        else if (tileset == "1B_0F_4000_45C0_179A")
            return {
                tileset: "assets/pokered-font/pic-tilesets/cemetery.png",
                container: "pr-container pr-large pr-pic-cemetery"
            }
        else if (tileset == "19_10_6D60_7350_17A2")
            return {
                tileset: "assets/pokered-font/pic-tilesets/interior.png",
                container: "pr-container pr-large pr-pic-interior"
            }
        else if (tileset == "1B_11_4CA0_50C0_17AC")
            return {
                tileset: "assets/pokered-font/pic-tilesets/cavern.png",
                container: "pr-container pr-large pr-pic-cavern"
            }
        else if (tileset == "1B_12_58C0_5EA0_17B8")
            return {
                tileset: "assets/pokered-font/pic-tilesets/lobby.png",
                container: "pr-container pr-large pr-pic-lobby"
            }
        else if (tileset == "19_13_5BB0_6190_17C0")
            return {
                tileset: "assets/pokered-font/pic-tilesets/mansion.png",
                container: "pr-container pr-large pr-pic-mansion"
            }
        else if (tileset == "1B_14_6D10_72D0_17CA")
            return {
                tileset: "assets/pokered-font/pic-tilesets/lab.png",
                container: "pr-container pr-large pr-pic-lab"
            }
        else if (tileset == "1B_15_7670_7B20_17D1")
            return {
                tileset: "assets/pokered-font/pic-tilesets/club.png",
                container: "pr-container pr-large pr-pic-club"
            }
        else if (tileset == "1A_16_71FF_77FF_17DD")
            return {
                tileset: "assets/pokered-font/pic-tilesets/facility.png",
                container: "pr-container pr-large pr-pic-facility"
            }
        else if (tileset == "19_17_76F0_7B50_17F0")
            return {
                tileset: "assets/pokered-font/pic-tilesets/plateau.png",
                container: "pr-container pr-large pr-pic-plateau"
            }

        return {
            tileset: "",
            container: ""
        };
    }

    get invalidClass() {
        return "pr pr-pic pr-raw-" + this.fileService.fileDataExpanded.area.outOfBoundsTile;
    }

    get grassClass() {
        return "pr pr-pic pr-raw-" + this.fileService.fileDataExpanded.area.tilesetGrassTile;
    }

    getCounterClass(val: number) {
        return "pr pr-pic pr-raw-" + this.fileService.fileDataExpanded.area.tilesetTalkingOverTiles[val];
    }
}
