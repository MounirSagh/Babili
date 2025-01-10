import { Router } from "express";
import { sendApprovalEmailController, sendConfirmationEmailController } from '../controllers/mail.controller';

const mailRouter = Router();

mailRouter.post('/approval', sendApprovalEmailController)
mailRouter.post('/confirmation', sendConfirmationEmailController)


export default mailRouter;