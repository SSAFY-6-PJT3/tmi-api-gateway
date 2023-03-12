import { Router } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

export const router = Router();

router.use(morgan("combined"));
router.use(bodyParser.json());
