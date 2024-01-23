import { catchAsyncError } from "../midddlewares/catchAsyncError.js";
import ErrorHandler from "../midddlewares/errorHandler.js";
import { ContactModel } from "../models/contactSchema/ContactModel.js";
import sendConfirmationMail from "../utils/sendConfirmationMail.js";

export const receiveMessageFromClient = catchAsyncError(
  async (req, res, next) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return next(new ErrorHandler("Please fill all the details", 400, false));
    }
    if (message.length <= 50) {
      return next(
        new ErrorHandler(
          "Message is too short. I believe you can write it more !",
          400,
          false
        )
      );
    }
    const contact = await ContactModel.create({
      name,
      email,
      message,
    });
    await contact.save();
    res.status(201).json({
      success: true,
      message: "Message send ✅",
      data: contact,
    });
    await sendConfirmationMail({
      recipientEmail: email,
      recipientName: name,
    });
  }
);
