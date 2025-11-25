module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/layout.jsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.jsx [app-rsc] (ecmascript)"));
}),
"[project]/src/data.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v([{"url":"/bayc1.avif"},{"url":"/bayc2.avif"},{"url":"/bayc3.avif"},{"url":"/bayc4.avif"},{"url":"/bayc5.png"},{"url":"/bayc6.avif"},{"url":"/bayc7.avif"},{"url":"/bayc8.avif"},{"url":"/bayc9.avif"},{"url":"/bayc1.avif"},{"url":"/bayc2.avif"},{"url":"/bayc3.avif"},{"url":"/bayc4.avif"},{"url":"/bayc5.png"},{"url":"/bayc6.avif"},{"url":"/bayc7.avif"},{"url":"/bayc8.avif"},{"url":"/bayc9.avif"}]);}),
"[project]/src/app/item/[id]/page.jsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ItemPage,
    "generateStaticParams",
    ()=>generateStaticParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2d$by$2d$string$2f$src$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid-by-string/src/index.js [app-rsc] (ecmascript)");
// Adjust the number of '../' depending on your exact folder structure
// If page is in src/app/item/[id]/page.jsx, then data is ../../../data.json
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/data.json (json)");
;
;
;
async function generateStaticParams() {
    // 1. Check if images exist
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2e$json__$28$json$29$__["default"] || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2e$json__$28$json$29$__["default"].length === 0) {
        return [];
    }
    // 2. Map over images to generate the paths
    // IMPORTANT: The key 'id' must match the folder name '[id]'
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2e$json__$28$json$29$__["default"].map((img)=>({
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2d$by$2d$string$2f$src$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(img.url)
        }));
}
function ItemPage({ params }) {
    const { id } = params;
    // Optional: Find the specific image data to display SEO tags
    const image = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2e$json__$28$json$29$__["default"].find((img)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2d$by$2d$string$2f$src$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(img.url) === id);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none text-white z-0",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "sr-only",
            children: [
                "Item ",
                id
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/item/[id]/page.jsx",
            lineNumber: 29,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/item/[id]/page.jsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/item/[id]/page.jsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/item/[id]/page.jsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__41300dcd._.js.map