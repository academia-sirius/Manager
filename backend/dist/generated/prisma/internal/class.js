"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.8.0",
    "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
    "activeProvider": "sqlite",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\ngenerator client {\n  provider = \"prisma-client\"\n  output   = \"../generated/prisma\"\n}\n\ndatasource db {\n  provider = \"sqlite\"\n}\n\nmodel Centro {\n  id        Int      @id @default(autoincrement())\n  email     String   @unique\n  senha     String\n  nome      String\n  tipo      String\n  logo      String?\n  slogan    String?\n  descricao String?\n  createdAt DateTime @default(now())\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"Centro\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"senha\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"nome\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"tipo\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"logo\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"slogan\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"descricao\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"Centro.findUnique\",\"Centro.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"Centro.findFirst\",\"Centro.findFirstOrThrow\",\"Centro.findMany\",\"data\",\"Centro.createOne\",\"Centro.createMany\",\"Centro.createManyAndReturn\",\"Centro.updateOne\",\"Centro.updateMany\",\"Centro.updateManyAndReturn\",\"create\",\"update\",\"Centro.upsertOne\",\"Centro.deleteOne\",\"Centro.deleteMany\",\"having\",\"_count\",\"_avg\",\"_sum\",\"_min\",\"_max\",\"Centro.groupBy\",\"Centro.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"email\",\"senha\",\"nome\",\"tipo\",\"logo\",\"slogan\",\"descricao\",\"createdAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"set\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "NwsQDBwAACkAMB0AAAQAEB4AACkAMB8CAAAAASABAAAAASEBACsAISIBACsAISMBACsAISQBACwAISUBACwAISYBACwAISdAAC0AIQEAAAABACABAAAAAQAgDBwAACkAMB0AAAQAEB4AACkAMB8CACoAISABACsAISEBACsAISIBACsAISMBACsAISQBACwAISUBACwAISYBACwAISdAAC0AIQMkAAAuACAlAAAuACAmAAAuACADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACAJHwIAAAABIAEAAAABIQEAAAABIgEAAAABIwEAAAABJAEAAAABJQEAAAABJgEAAAABJ0AAAAABAQgAAAkAIAkfAgAAAAEgAQAAAAEhAQAAAAEiAQAAAAEjAQAAAAEkAQAAAAElAQAAAAEmAQAAAAEnQAAAAAEBCAAACwAwAQgAAAsAMAkfAgA3ACEgAQA0ACEhAQA0ACEiAQA0ACEjAQA0ACEkAQA1ACElAQA1ACEmAQA1ACEnQAA2ACECAAAAAQAgCAAADgAgCR8CADcAISABADQAISEBADQAISIBADQAISMBADQAISQBADUAISUBADUAISYBADUAISdAADYAIQIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgCBUAAC8AIBYAADAAIBcAADMAIBgAADIAIBkAADEAICQAAC4AICUAAC4AICYAAC4AIAwcAAAaADAdAAAXABAeAAAaADAfAgAbACEgAQAcACEhAQAcACEiAQAcACEjAQAcACEkAQAdACElAQAdACEmAQAdACEnQAAeACEDAAAABAAgAwAAFgAwFAAAFwAgAwAAAAQAIAMAAAUAMAQAAAEAIAwcAAAaADAdAAAXABAeAAAaADAfAgAbACEgAQAcACEhAQAcACEiAQAcACEjAQAcACEkAQAdACElAQAdACEmAQAdACEnQAAeACENFQAAIAAgFgAAKAAgFwAAIAAgGAAAIAAgGQAAIAAgKAIAAAABKQIAAAAEKgIAAAAEKwIAAAABLAIAAAABLQIAAAABLgIAAAABLwIAJwAhDhUAACAAIBgAACYAIBkAACYAICgBAAAAASkBAAAABCoBAAAABCsBAAAAASwBAAAAAS0BAAAAAS4BAAAAAS8BACUAITABAAAAATEBAAAAATIBAAAAAQ4VAAAjACAYAAAkACAZAAAkACAoAQAAAAEpAQAAAAUqAQAAAAUrAQAAAAEsAQAAAAEtAQAAAAEuAQAAAAEvAQAiACEwAQAAAAExAQAAAAEyAQAAAAELFQAAIAAgGAAAIQAgGQAAIQAgKEAAAAABKUAAAAAEKkAAAAAEK0AAAAABLEAAAAABLUAAAAABLkAAAAABL0AAHwAhCxUAACAAIBgAACEAIBkAACEAIChAAAAAASlAAAAABCpAAAAABCtAAAAAASxAAAAAAS1AAAAAAS5AAAAAAS9AAB8AIQgoAgAAAAEpAgAAAAQqAgAAAAQrAgAAAAEsAgAAAAEtAgAAAAEuAgAAAAEvAgAgACEIKEAAAAABKUAAAAAEKkAAAAAEK0AAAAABLEAAAAABLUAAAAABLkAAAAABL0AAIQAhDhUAACMAIBgAACQAIBkAACQAICgBAAAAASkBAAAABSoBAAAABSsBAAAAASwBAAAAAS0BAAAAAS4BAAAAAS8BACIAITABAAAAATEBAAAAATIBAAAAAQgoAgAAAAEpAgAAAAUqAgAAAAUrAgAAAAEsAgAAAAEtAgAAAAEuAgAAAAEvAgAjACELKAEAAAABKQEAAAAFKgEAAAAFKwEAAAABLAEAAAABLQEAAAABLgEAAAABLwEAJAAhMAEAAAABMQEAAAABMgEAAAABDhUAACAAIBgAACYAIBkAACYAICgBAAAAASkBAAAABCoBAAAABCsBAAAAASwBAAAAAS0BAAAAAS4BAAAAAS8BACUAITABAAAAATEBAAAAATIBAAAAAQsoAQAAAAEpAQAAAAQqAQAAAAQrAQAAAAEsAQAAAAEtAQAAAAEuAQAAAAEvAQAmACEwAQAAAAExAQAAAAEyAQAAAAENFQAAIAAgFgAAKAAgFwAAIAAgGAAAIAAgGQAAIAAgKAIAAAABKQIAAAAEKgIAAAAEKwIAAAABLAIAAAABLQIAAAABLgIAAAABLwIAJwAhCCgIAAAAASkIAAAABCoIAAAABCsIAAAAASwIAAAAAS0IAAAAAS4IAAAAAS8IACgAIQwcAAApADAdAAAEABAeAAApADAfAgAqACEgAQArACEhAQArACEiAQArACEjAQArACEkAQAsACElAQAsACEmAQAsACEnQAAtACEIKAIAAAABKQIAAAAEKgIAAAAEKwIAAAABLAIAAAABLQIAAAABLgIAAAABLwIAIAAhCygBAAAAASkBAAAABCoBAAAABCsBAAAAASwBAAAAAS0BAAAAAS4BAAAAAS8BACYAITABAAAAATEBAAAAATIBAAAAAQsoAQAAAAEpAQAAAAUqAQAAAAUrAQAAAAEsAQAAAAEtAQAAAAEuAQAAAAEvAQAkACEwAQAAAAExAQAAAAEyAQAAAAEIKEAAAAABKUAAAAAEKkAAAAAEK0AAAAABLEAAAAABLUAAAAABLkAAAAABL0AAIQAhAAAAAAAAATMBAAAAAQEzAQAAAAEBM0AAAAABBTMCAAAAATQCAAAAATUCAAAAATYCAAAAATcCAAAAAQAAAAAFFQAGFgAHFwAIGAAJGQAKAAAAAAAFFQAGFgAHFwAIGAAJGQAKAQIBAgMBBQYBBgcBBwgBCQoBCgwCCw0DDA8BDRECDhIEERMBEhQBExUCGhgFGxkL"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.sqlite.mjs"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.sqlite.wasm-base64.mjs");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map