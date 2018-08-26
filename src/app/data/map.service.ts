import { Injectable } from '@angular/core';

export interface RawMap {
    name: string,
    ind: number,
    glitch?: boolean,
    special?: boolean, // Scripted / Treated specially

    // From Map Constants File
    height?: number,
    width?: number,

    // From Symbol File
    dataPtr?: number, // ex: SaffronCityBlocks
    scriptPtr?: number, // ex: SaffronCityScript
    textPtr?: number, // ex: SaffronCityTextPointers

    // Just multiply height & width by 2
    height2x2?: number,
    width2x2?: number,

    // Side Note: You know I must really love doing this because this is a
    // magnificent amount of work ..o.>_<.o..
}

export const rawMaps: RawMap[] = [
    { name: "Pallet Town", ind: 0x00, height: 9, width: 10, dataPtr: 0x42FD, scriptPtr: 0x4E5B, textPtr: 0x4F88 },
    { name: "Viridian City", ind: 0x01, height: 18, width: 20, dataPtr: 0x43EC, scriptPtr: 0x4FF1, textPtr: 0x50E4 },
    { name: "Pewter City", ind: 0x02, height: 18, width: 20, dataPtr: 0x45E6, scriptPtr: 0x5237, textPtr: 0x538B },
    { name: "Cerulean City", ind: 0x03, height: 18, width: 20, dataPtr: 0x4830, scriptPtr: 0x5480, textPtr: 0x562D },
    { name: "Lavender Town", ind: 0x04, height: 9, width: 10, dataPtr: 0x4085, scriptPtr: 0x410B, textPtr: 0x410E },
    { name: "Vermilion City", ind: 0x05, height: 18, width: 20, dataPtr: 0x4A3F, scriptPtr: 0x57A1, textPtr: 0x586F },
    { name: "Celadon City", ind: 0x06, height: 18, width: 25, dataPtr: 0x40DF, scriptPtr: 0x5956, textPtr: 0x5966 },
    { name: "Fuchsia City", ind: 0x07, height: 18, width: 20, dataPtr: 0x4C86, scriptPtr: 0x5A2B, textPtr: 0x5A2E },
    { name: "Cinnabar Island", ind: 0x08, height: 9, width: 10, dataPtr: 0x4069, scriptPtr: 0x4A19, textPtr: 0x4A81 },
    { name: "Indigo Plateau", ind: 0x09, height: 9, width: 10, dataPtr: 0x494A, scriptPtr: 0x4935, textPtr: 0x4936 }, // 10
    { name: "Saffron City", ind: 0x0a, height: 18, width: 20, dataPtr: 0x4A98, scriptPtr: 0x4C00, textPtr: 0x4C03 },
    { name: "Unused Map 0B", ind: 0x0b, glitch: true, height: 0, width: 0 },
    { name: "Route 1", ind: 0x0c, height: 18, width: 10, dataPtr: 0x40FC, scriptPtr: 0x4AAF, textPtr: 0x4AB2 },
    { name: "Route 2", ind: 0x0d, height: 36, width: 10, dataPtr: 0x407E, scriptPtr: 0x54E3, textPtr: 0x54E6 },
    { name: "Route 3", ind: 0x0e, height: 9, width: 35, dataPtr: 0x4255, scriptPtr: 0x54F8, textPtr: 0x5511 },
    { name: "Route 4", ind: 0x0f, height: 9, width: 45, dataPtr: 0x43EC, scriptPtr: 0x5658, textPtr: 0x5671 },
    { name: "Route 5", ind: 0x10, height: 18, width: 10, dataPtr: 0x45D2, scriptPtr: 0x56B2, textPtr: 0x56B5 },
    { name: "Route 6", ind: 0x11, height: 18, width: 10, dataPtr: 0x4079, scriptPtr: 0x50B0, textPtr: 0x50C9 },
    { name: "Route 7", ind: 0x12, height: 9, width: 10, dataPtr: 0x4051, scriptPtr: 0x4152, textPtr: 0x4155 },
    { name: "Route 8", ind: 0x13, height: 9, width: 30, dataPtr: 0x41C6, scriptPtr: 0x51B6, textPtr: 0x51CF }, // 20
    { name: "Route 9", ind: 0x14, height: 9, width: 30, dataPtr: 0x46FE, scriptPtr: 0x56BC, textPtr: 0x56D5 },
    { name: "Route 10", ind: 0x15, height: 36, width: 10, dataPtr: 0x4356, scriptPtr: 0x5336, textPtr: 0x534F },
    { name: "Route 11", ind: 0x16, height: 9, width: 30, dataPtr: 0x455F, scriptPtr: 0x544C, textPtr: 0x5465 },
    { name: "Route 12", ind: 0x17, height: 54, width: 10, dataPtr: 0x4710, scriptPtr: 0x55F3, textPtr: 0x5675 },
    { name: "Route 13", ind: 0x18, height: 9, width: 30, dataPtr: 0x488B, scriptPtr: 0x581E, textPtr: 0x5837 },
    { name: "Route 14", ind: 0x19, height: 27, width: 10, dataPtr: 0x4A12, scriptPtr: 0x59D3, textPtr: 0x59EC },
    { name: "Route 15", ind: 0x1a, height: 9, width: 30, dataPtr: 0x49CC, scriptPtr: 0x57AE, textPtr: 0x57C7 },
    { name: "Route 16", ind: 0x1b, height: 9, width: 20, dataPtr: 0x4B84, scriptPtr: 0x5933, textPtr: 0x59B9 },
    { name: "Route 17", ind: 0x1c, height: 72, width: 10, dataPtr: 0x4BA8, scriptPtr: 0x5B7A, textPtr: 0x5B93 },
    { name: "Route 18", ind: 0x1d, height: 9, width: 25, dataPtr: 0x4C9C, scriptPtr: 0x5AC7, textPtr: 0x5AE0 }, // 30
    { name: "Route 19", ind: 0x1e, height: 27, width: 10, dataPtr: 0x4EF1, scriptPtr: 0x5D44, textPtr: 0x5D5D },
    { name: "Route 20", ind: 0x1f, height: 9, width: 50, dataPtr: 0x417D, scriptPtr: 0x4CA9, textPtr: 0x4D22 },
    { name: "Route 21", ind: 0x20, height: 45, width: 10, dataPtr: 0x506D, scriptPtr: 0x5EEB, textPtr: 0x5F04 },
    { name: "Route 22", ind: 0x21, height: 9, width: 20, dataPtr: 0x403D, scriptPtr: 0x4EB2, textPtr: 0x5175 },
    { name: "Route 23", ind: 0x22, height: 72, width: 10, dataPtr: 0x43B2, scriptPtr: 0x51DA, textPtr: 0x52F7 },
    { name: "Route 24", ind: 0x23, height: 18, width: 10, dataPtr: 0x46E7, scriptPtr: 0x53AD, textPtr: 0x544B },
    { name: "Route 25", ind: 0x24, height: 9, width: 30, dataPtr: 0x4810, scriptPtr: 0x55CB, textPtr: 0x5628 },
    { name: "Reds House 1f", ind: 0x25, height: 4, width: 4, dataPtr: 0x4209, scriptPtr: 0x4168, textPtr: 0x416B },
    { name: "Reds House 2f", ind: 0x26, height: 4, width: 4, dataPtr: 0x4010, scriptPtr: 0x40B0, textPtr: 0x40CF },
    { name: "Blues House", ind: 0x27, height: 4, width: 4, dataPtr: 0x5BF6, scriptPtr: 0x5B3B, textPtr: 0x5B57 }, // 40
    { name: "Oaks Lab", ind: 0x28, height: 6, width: 5 },
    { name: "Viridian Pokecenter", ind: 0x29, height: 4, width: 7 },
    { name: "Viridian Mart", ind: 0x2a, height: 4, width: 4 },
    { name: "Viridian School", ind: 0x2b, height: 4, width: 4 },
    { name: "Viridian House", ind: 0x2c, height: 4, width: 4 },
    { name: "Viridian Gym", ind: 0x2d, height: 9, width: 10 },
    { name: "Digletts Cave Exit", ind: 0x2e, height: 4, width: 4 },
    { name: "Viridian Forest Exit", ind: 0x2f, height: 4, width: 5 },
    { name: "Route 2 House", ind: 0x30, height: 4, width: 4 },
    { name: "Route 2 Gate", ind: 0x31, height: 4, width: 5 }, // 50
    { name: "Viridian Forest Entrance", ind: 0x32, height: 4, width: 5 },
    { name: "Viridian Forest", ind: 0x33, height: 24, width: 17 },
    { name: "Museum 1f", ind: 0x34, height: 4, width: 10 },
    { name: "Museum 2f", ind: 0x35, height: 4, width: 7 },
    { name: "Pewter Gym", ind: 0x36, height: 7, width: 5 },
    { name: "Pewter House 1", ind: 0x37, height: 4, width: 4 },
    { name: "Pewter Mart", ind: 0x38, height: 4, width: 4 },
    { name: "Pewter House 2", ind: 0x39, height: 4, width: 4 },
    { name: "Pewter Pokecenter", ind: 0x3a, height: 4, width: 7 },
    { name: "Mt. Moon 1", ind: 0x3b, height: 18, width: 20 }, // 60
    { name: "Mt. Moon 2", ind: 0x3c, height: 14, width: 14 },
    { name: "Mt. Moon 3", ind: 0x3d, height: 18, width: 20 },
    { name: "Trashed House", ind: 0x3e, height: 4, width: 4 },
    { name: "Cerulean House 1", ind: 0x3f, height: 4, width: 4 },
    { name: "Cerulean Pokecenter", ind: 0x40, height: 4, width: 7 },
    { name: "Cerulean Gym", ind: 0x41, height: 7, width: 5 },
    { name: "Bike Shop", ind: 0x42, height: 4, width: 4 },
    { name: "Cerulean Mart", ind: 0x43, height: 4, width: 4 },
    { name: "Mt. Moon Pokecenter", ind: 0x44, height: 4, width: 7 },
    { name: "Trashed House Copy", ind: 0x45, height: 4, width: 4 },
    { name: "Route 5 Gate", ind: 0x46, height: 3, width: 4 },
    { name: "Path Entrance Route 5", ind: 0x47, height: 4, width: 4 },
    { name: "Daycare", ind: 0x48, height: 4, width: 4 },
    { name: "Route 6 Gate", ind: 0x49, height: 3, width: 4 },
    { name: "Path Entrance Route 6", ind: 0x4a, height: 4, width: 4 },
    { name: "Path Entrance Route 6 Copy", ind: 0x4b, height: 4, width: 4 },
    { name: "Route 7 Gate", ind: 0x4c, height: 4, width: 3 },
    { name: "Path Entrance Route 7", ind: 0x4d, height: 4, width: 4 },
    { name: "Path Entrance Route 7 Copy", ind: 0x4e, height: 4, width: 4 },
    { name: "Route 8 Gate", ind: 0x4f, height: 4, width: 3 },
    { name: "Path Entrance Route 8", ind: 0x50, height: 4, width: 4 },
    { name: "Rock Tunnel Pokecenter", ind: 0x51, height: 4, width: 7 },
    { name: "Rock Tunnel 1", ind: 0x52, height: 18, width: 20 },
    { name: "Power Plant", ind: 0x53, height: 18, width: 20 },
    { name: "Route 11 Gate 1f", ind: 0x54, height: 5, width: 4 },
    { name: "Digletts Cave Entrance", ind: 0x55, height: 4, width: 4 },
    { name: "Route 11 Gate 2f", ind: 0x56, height: 4, width: 4 },
    { name: "Route 12 Gate 1f", ind: 0x57, height: 4, width: 5 },
    { name: "Bills House", ind: 0x58, height: 4, width: 4 },
    { name: "Vermilion Pokecenter", ind: 0x59, height: 4, width: 7 },
    { name: "Pokemon Fan Club", ind: 0x5a, height: 4, width: 4 },
    { name: "Vermilion Mart", ind: 0x5b, height: 4, width: 4 },
    { name: "Vermilion Gym", ind: 0x5c, height: 9, width: 5 },
    { name: "Vermilion House 1", ind: 0x5d, height: 4, width: 4 },
    { name: "Vermilion Dock", ind: 0x5e, height: 6, width: 14 },
    { name: "S.S. Anne 1", ind: 0x5f, height: 9, width: 20 },
    { name: "S.S. Anne 2", ind: 0x60, height: 9, width: 20 },
    { name: "S.S. Anne 3", ind: 0x61, height: 3, width: 10 },
    { name: "S.S. Anne 4", ind: 0x62, height: 4, width: 15 },
    { name: "S.S. Anne 5", ind: 0x63, height: 7, width: 10 },
    { name: "S.S. Anne 6", ind: 0x64, height: 8, width: 7 },
    { name: "S.S. Anne 7", ind: 0x65, height: 4, width: 3 },
    { name: "S.S. Anne 8", ind: 0x66, height: 8, width: 12 },
    { name: "S.S. Anne 9", ind: 0x67, height: 8, width: 12 },
    { name: "S.S. Anne 10", ind: 0x68, height: 8, width: 12 },
    { name: "Unused Map 69", ind: 0x69, glitch: true, height: 0, width: 0 },
    { name: "Unused Map 6A", ind: 0x6a, glitch: true, height: 0, width: 0 },
    { name: "Unused Map 6B", ind: 0x6b, glitch: true, height: 0, width: 0 },
    { name: "Victory Road 1", ind: 0x6c, height: 9, width: 10 },
    { name: "Unused Map 6D", ind: 0x6d, glitch: true, height: 0, width: 0 },
    { name: "Unused Map 6E", ind: 0x6e, glitch: true, height: 0, width: 0 },
    { name: "Unused Map 6F", ind: 0x6f, glitch: true, height: 0, width: 0 },
    { name: "Unused Map 70", ind: 0x70, glitch: true, height: 0, width: 0 },
    { name: "Lances Room", ind: 0x71, height: 13, width: 13 },
    { name: "Unused Map 72", ind: 0x72, glitch: true, height: 0, width: 0 },
    { name: "Unused Map 73", ind: 0x73, glitch: true, height: 0, width: 0 },
    { name: "Unused Map 74", ind: 0x74, glitch: true, height: 0, width: 0 },
    { name: "Unused Map 75", ind: 0x75, glitch: true, height: 0, width: 0 },
    { name: "Hall of Fame", ind: 0x76, height: 4, width: 5 },
    { name: "Underground Path NS", ind: 0x77, height: 24, width: 4 },
    { name: "Champions Room", ind: 0x78, height: 4, width: 4 },
    { name: "Underground Path WE", ind: 0x79, height: 4, width: 25 },
    { name: "Celadon Mart 1", ind: 0x7a, height: 4, width: 10 },
    { name: "Celadon Mart 2", ind: 0x7b, height: 4, width: 10 },
    { name: "Celadon Mart 3", ind: 0x7c, height: 4, width: 10 },
    { name: "Celadon Mart 4", ind: 0x7d, height: 4, width: 10 },
    { name: "Celadon Mart Roof", ind: 0x7e, height: 4, width: 10 },
    { name: "Celadon Mart Elevator", ind: 0x7f, height: 2, width: 2 },
    { name: "Celadon Mansion 1", ind: 0x80, height: 6, width: 4 },
    { name: "Celadon Mansion 2", ind: 0x81, height: 6, width: 4 },
    { name: "Celadon Mansion 3", ind: 0x82, height: 6, width: 4 },
    { name: "Celadon Mansion 4", ind: 0x83, height: 6, width: 4 },
    { name: "Celadon Mansion 5", ind: 0x84, height: 4, width: 4 },
    { name: "Celadon Pokecenter", ind: 0x85, height: 4, width: 7 },
    { name: "Celadon Gym", ind: 0x86, height: 9, width: 5 },
    { name: "Game Corner", ind: 0x87, height: 9, width: 10 },
    { name: "Celadon Mart 5", ind: 0x88, height: 4, width: 10 },
    { name: "Celadon Prize Room", ind: 0x89, height: 4, width: 5 },
    { name: "Celadon Diner", ind: 0x8a, height: 4, width: 5 },
    { name: "Celadon House", ind: 0x8b, height: 4, width: 4 },
    { name: "Celadon Hotel", ind: 0x8c, height: 4, width: 7 },
    { name: "Lavender Pokecenter", ind: 0x8d, height: 4, width: 7 },
    { name: "Pokemontower 1", ind: 0x8e, height: 9, width: 10 },
    { name: "Pokemontower 2", ind: 0x8f, height: 9, width: 10 },
    { name: "Pokemontower 3", ind: 0x90, height: 9, width: 10 },
    { name: "Pokemontower 4", ind: 0x91, height: 9, width: 10 },
    { name: "Pokemontower 5", ind: 0x92, height: 9, width: 10 },
    { name: "Pokemontower 6", ind: 0x93, height: 9, width: 10 },
    { name: "Pokemontower 7", ind: 0x94, height: 9, width: 10 },
    { name: "Lavender House 1", ind: 0x95, height: 4, width: 4 },
    { name: "Lavender Mart", ind: 0x96, height: 4, width: 4 },
    { name: "Lavender House 2", ind: 0x97, height: 4, width: 4 },
    { name: "Fuchsia Mart", ind: 0x98, height: 4, width: 4 },
    { name: "Fuchsia House 1", ind: 0x99, height: 4, width: 4 },
    { name: "Fuchsia Pokecenter", ind: 0x9a, height: 4, width: 7 },
    { name: "Fuchsia House 2", ind: 0x9b, height: 4, width: 5 },
    { name: "Safari Zone Entrance", ind: 0x9c, height: 3, width: 4 },
    { name: "Fuchsia Gym", ind: 0x9d, height: 9, width: 5 },
    { name: "Fuchsia Meeting Room", ind: 0x9e, height: 4, width: 7 },
    { name: "Seafoam Islands 2", ind: 0x9f, height: 9, width: 15 },
    { name: "Seafoam Islands 3", ind: 0xa0, height: 9, width: 15 },
    { name: "Seafoam Islands 4", ind: 0xa1, height: 9, width: 15 },
    { name: "Seafoam Islands 5", ind: 0xa2, height: 9, width: 15 },
    { name: "Vermilion House 2", ind: 0xa3, height: 4, width: 4 },
    { name: "Fuchsia House 3", ind: 0xa4, height: 4, width: 4 },
    { name: "Mansion 1", ind: 0xa5, height: 14, width: 15 },
    { name: "Cinnabar Gym", ind: 0xa6, height: 9, width: 10 },
    { name: "Cinnabar Lab 1", ind: 0xa7, height: 4, width: 9 },
    { name: "Cinnabar Lab 2", ind: 0xa8, height: 4, width: 4 },
    { name: "Cinnabar Lab 3", ind: 0xa9, height: 4, width: 4 },
    { name: "Cinnabar Lab 4", ind: 0xaa, height: 4, width: 4 },
    { name: "Cinnabar Pokecenter", ind: 0xab, height: 4, width: 7 },
    { name: "Cinnabar Mart", ind: 0xac, height: 4, width: 4 },
    { name: "Cinnabar Mart Copy", ind: 0xad, height: 4, width: 4 },
    { name: "Indigo Plateau Lobby", ind: 0xae, height: 6, width: 8 },
    { name: "Copycats House 1f", ind: 0xaf, height: 4, width: 4 },
    { name: "Copycats House 2f", ind: 0xb0, height: 4, width: 4 },
    { name: "Fighting Dojo", ind: 0xb1, height: 6, width: 5 },
    { name: "Saffron Gym", ind: 0xb2, height: 9, width: 10 },
    { name: "Saffron House 1", ind: 0xb3, height: 4, width: 4 },
    { name: "Saffron Mart", ind: 0xb4, height: 4, width: 4 },
    { name: "Silph Co 1f", ind: 0xb5, height: 9, width: 15 },
    { name: "Saffron Pokecenter", ind: 0xb6, height: 4, width: 7 },
    { name: "Saffron House 2", ind: 0xb7, height: 4, width: 4 },
    { name: "Route 15 Gate 1f", ind: 0xb8, height: 5, width: 4 },
    { name: "Route 15 Gate 2f", ind: 0xb9, height: 4, width: 4 },
    { name: "Route 16 Gate 1f", ind: 0xba, height: 7, width: 4 },
    { name: "Route 16 Gate 2f", ind: 0xbb, height: 4, width: 4 },
    { name: "Route 16 House", ind: 0xbc, height: 4, width: 4 },
    { name: "Route 12 House", ind: 0xbd, height: 4, width: 4 },
    { name: "Route 18 Gate 1f", ind: 0xbe, height: 5, width: 4 },
    { name: "Route 18 Gate 2f", ind: 0xbf, height: 4, width: 4 },
    { name: "Seafoam Islands 1", ind: 0xc0, height: 9, width: 15 },
    { name: "Route 22 Gate", ind: 0xc1, height: 4, width: 5 },
    { name: "Victory Road 2", ind: 0xc2, height: 9, width: 15 },
    { name: "Route 12 Gate 2f", ind: 0xc3, height: 4, width: 4 },
    { name: "Vermilion House 3", ind: 0xc4, height: 4, width: 4 },
    { name: "Digletts Cave", ind: 0xc5, height: 18, width: 20 },
    { name: "Victory Road 3", ind: 0xc6, height: 9, width: 15 },
    { name: "Rocket Hideout 1", ind: 0xc7, height: 14, width: 15 },
    { name: "Rocket Hideout 2", ind: 0xc8, height: 14, width: 15 },
    { name: "Rocket Hideout 3", ind: 0xc9, height: 14, width: 15 },
    { name: "Rocket Hideout 4", ind: 0xca, height: 12, width: 15 },
    { name: "Rocket Hideout Elevator", ind: 0xcb, height: 4, width: 3 },
    { name: "Unused Map CC", ind: 0xcc, glitch: true, height: 0, width: 0 },
    { name: "Unused Map CD", ind: 0xcd, glitch: true, height: 0, width: 0 },
    { name: "Unused Map CE", ind: 0xce, glitch: true, height: 0, width: 0 },
    { name: "Silph Co 2f", ind: 0xcf, height: 9, width: 15 },
    { name: "Silph Co 3f", ind: 0xd0, height: 9, width: 15 },
    { name: "Silph Co 4f", ind: 0xd1, height: 9, width: 15 },
    { name: "Silph Co 5f", ind: 0xd2, height: 9, width: 15 },
    { name: "Silph Co 6f", ind: 0xd3, height: 9, width: 13 },
    { name: "Silph Co 7f", ind: 0xd4, height: 9, width: 13 },
    { name: "Silph Co 8f", ind: 0xd5, height: 9, width: 13 },
    { name: "Mansion 2", ind: 0xd6, height: 14, width: 15 },
    { name: "Mansion 3", ind: 0xd7, height: 9, width: 15 },
    { name: "Mansion 4", ind: 0xd8, height: 14, width: 15 },
    { name: "Safari Zone East", ind: 0xd9, height: 13, width: 15 },
    { name: "Safari Zone North", ind: 0xda, height: 18, width: 20 },
    { name: "Safari Zone West", ind: 0xdb, height: 13, width: 15 },
    { name: "Safari Zone Center", ind: 0xdc, height: 13, width: 15 },
    { name: "Safari Zone Rest House 1", ind: 0xdd, height: 4, width: 4 },
    { name: "Safari Zone Secret House", ind: 0xde, height: 4, width: 4 },
    { name: "Safari Zone Rest House 2", ind: 0xdf, height: 4, width: 4 },
    { name: "Safari Zone Rest House 3", ind: 0xe0, height: 4, width: 4 },
    { name: "Safari Zone Rest House 4", ind: 0xe1, height: 4, width: 4 },
    { name: "Unknown Dungeon 2", ind: 0xe2, height: 9, width: 15 },
    { name: "Unknown Dungeon 3", ind: 0xe3, height: 9, width: 15 },
    { name: "Unknown Dungeon 1", ind: 0xe4, height: 9, width: 15 },
    { name: "Name Raters House", ind: 0xe5, height: 4, width: 4 },
    { name: "Cerulean House 2", ind: 0xe6, height: 4, width: 4 },
    { name: "Unused Map E7", ind: 0xe7, glitch: true, height: 0, width: 0 },
    { name: "Rock Tunnel 2", ind: 0xe8, height: 18, width: 20 },
    { name: "Silph Co 9f", ind: 0xe9, height: 9, width: 13 },
    { name: "Silph Co 10f", ind: 0xea, height: 9, width: 8 },
    { name: "Silph Co 11f", ind: 0xeb, height: 9, width: 9 },
    { name: "Silph Co Elevator", ind: 0xec, height: 2, width: 2 },
    { name: "Unused Map ED", ind: 0xed, glitch: true, height: 0, width: 0 },
    { name: "Unused Map EE", ind: 0xee, glitch: true, height: 0, width: 0 },
    { name: "Trade Center", ind: 0xef, height: 4, width: 5 },
    { name: "Colosseum", ind: 0xf0, height: 4, width: 5 },
    { name: "Unused Map F1", ind: 0xf1, glitch: true, height: 0, width: 0 },
    { name: "Unused Map F2", ind: 0xf2, glitch: true, height: 0, width: 0 },
    { name: "Unused Map F3", ind: 0xf3, glitch: true, height: 0, width: 0 },
    { name: "Unused Map F4", ind: 0xf4, glitch: true, height: 0, width: 0 },
    { name: "Loreleis Room", ind: 0xf5, height: 6, width: 5 },
    { name: "Brunos Room", ind: 0xf6, height: 6, width: 5 },
    { name: "Agathas Room", ind: 0xf7, height: 6, width: 5 },
    { name: "Last Map", ind: 0xff, special: true },
]

@Injectable({
    providedIn: 'root'
})
export class MapService {

    constructor() {

        // Pointer cache for error checking
        const ptrCache = {};

        // Prepare lots of initialization and other stuff
        for (var i = 0; i < rawMaps.length; i++) {

            // Grab the map entry
            const rawEntry = rawMaps[i];

            // Check pointers for duplicate in cache
            // Out of all the script, text, and data pointers combined, there should
            // be no duplicates
            // If not a duplicate, register it in the cache, if duplicate found
            // crash immidiately with message on duplicate pointer and of type

            if (rawEntry.dataPtr) {
                // @ts-ignore
                if (ptrCache[rawEntry.dataPtr] !== undefined)
                    throw new Error("Duplicate Data Pointer " + rawEntry.dataPtr.toString(16).toUpperCase());

                // @ts-ignore
                ptrCache[rawEntry.dataPtr] = true;
            }

            if (rawEntry.scriptPtr) {
                // @ts-ignore
                if (ptrCache[rawEntry.scriptPtr] !== undefined)
                    throw new Error("Duplicate Script Pointer " + rawEntry.scriptPtr.toString(16).toUpperCase());

                // @ts-ignore
                ptrCache[rawEntry.scriptPtr] = true;
            }

            if (rawEntry.textPtr) {
                // @ts-ignore
                if (ptrCache[rawEntry.textPtr] !== undefined)
                    throw new Error("Duplicate Text Pointer " + rawEntry.textPtr.toString(16).toUpperCase());

                // @ts-ignore
                ptrCache[rawEntry.textPtr] = true;
            }

            // Pointers have been verified
            // Pre-calc 2x2 width and height
            if (rawEntry.height)
                rawEntry.height2x2 = rawEntry.height * 2;

            if (rawEntry.width)
                rawEntry.width2x2 = rawEntry.width * 2;

            // Normal stuff, just book-keeping and indexing
            const ind = rawEntry.ind;
            const name = rawEntry.name;

            this.nameToInd[name] = rawEntry;

            this.indToName = [];
            this.indToName[ind] = rawEntry;
        };
    }

    // Generated list of Pokemon in same order as above but lookup index by name
    public nameToInd: {
        [key: string]: RawMap
    } = {};

    // Generated list of Pokemon in same order as above but lookup name by index
    // @ts-ignore - It's clearly defined above, I don't understand what your comaplining about
    public indToName: RawMap[];

    public rawTypes = rawMaps;
}
