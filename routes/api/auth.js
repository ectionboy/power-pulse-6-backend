const express = require("express");
const ctrl = require("../../controllers/auth/index");
const router = express.Router();
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.current);
router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
// "/auth/register": {
//     "post": {
//       "tags": ["Auth"],
//       "summary": "User registration",
//       "parameters": [],
//       "security": [{ "Bearer": [] }],
//       "requestBody": {
//         "description": "Registration's object",
//         "required": true,
//         "content": {
//           "application/json": {
//             "schema": {
//               "$ref": "#/components/schemas/RegistrationRequest"
//             }
//           }
//         }
//       },
//       "responses": {
//         "201": {
//           "description": "Successful operation",
//           "content": {
//             "application/json": {
//               "schema": {
//                 "$ref": "#/components/schemas/RegistrationResponse"
//               }
//             }
//           }
//         },
//         "400": {
//           "description": "Bad request (invalid request body)",
//           "content": {}
//         },
//         "409": {
//           "description": "Provided email already exists",
//           "content": {}
//         }
//       }
//     }
//   }