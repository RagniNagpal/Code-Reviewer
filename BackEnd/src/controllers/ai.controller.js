// const aiService = require("../services/ai.service");

// module.exports.getReview = async (req, res) => {
//   console.log("➡️ Body received:", req.body);

//   const code = req.body.code;

//   if (!code) {
//     return res.status(400).send("Prompt is required");
//   }

//   // const response = await aiService(code);
//   // res.send({ message: response });
// //   module.exports.getReview = async (req, res) => {
// //   try {
// //     const code = req.body.code;
// //     if (!code) {
// //       return res.status(400).json({ message: "Code is required" });
// //     }

// //     const response = await aiService(code);
// //     res.json({ message: response });

// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({
// //       message: "AI service unavailable. Please try again later."
// //     });
// //   }
// // };

// module.exports.getReview = async (req, res) => {
//   try {
//     console.log("➡️ Body received:", req.body);

//     const code = req.body.ccode; // 🔥 YAHI FIX

//     if (!code) {
//       return res.status(400).json({ message: "Code is required" });
//     }

//     const response = await aiService(code);
//     res.json({ message: response });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       message: "AI service unavailable"
//     });
//   }
// };


//  };



// const aiService = require("../services/ai.service");

// module.exports.getReview = async (req, res) => {
//   try {
//     console.log("➡️ Body received:", req.body);

//     const code = req.body.code; // ✅ ONLY code

//     if (!code) {
//       return res.status(400).json({ message: "Code is required" });
//     }

//     const response = await aiService(code);
//     res.json({ message: response });

//   } catch (err) {
//     console.error("AI ERROR:", err);
//     res.status(500).json({
//       message: "AI service unavailable"
//     });
//   }
// };


const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  try {
    const code = req.body.code;

    if (!code) {
      return res.status(400).json({ message: "Code is required" });
    }

    const response = await aiService(code);
    return res.json({ message: response });

  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({ message: "AI service unavailable" });
  }
};
