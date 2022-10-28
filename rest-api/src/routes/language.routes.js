import { Router } from "express";
import { methods as languageControler } from "../controllers/language.controler";

const router = Router();

router.get("/", languageControler.getLanguages);
router.get("/:id", languageControler.getLanguage);
router.post("/", languageControler.addLanguages);
router.delete("/:id", languageControler.deleteLanguage);
router.put("/:id", languageControler.updateLanguage);

export default router;