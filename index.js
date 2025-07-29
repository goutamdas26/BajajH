const express = require("express");
const app = express();
const PORT = 3033; 

const full_name = "goutam_das";
const dob = "26052004"; 
const user_id = `${full_name.toLowerCase()}_${dob}`;
app.use(express.json());

app.get("/",(req,res)=>{
  res.send("Server Running");
})
app.post("/bfhl", (req, res) => {
try{
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({
        is_success: false,
       
      });
    }
    const result = {
        is_success: true,
        user_id,
        email: "goutam@example.com",
        roll_number: "2211981160",
        even_numbers: [],
        odd_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: "0",
        new_string: ""
      };
      let sum = 0;
      let newString = [];

      data.forEach(e => {
        if (!isNaN(e) && typeof e !== 'boolean') {
          const num = parseInt(e);
         (num % 2 === 0) ?result.even_numbers.push(e):result.odd_numbers.push(e);
          sum += num;
        } else if (/^[a-zA-Z]+$/.test(e)) {
          result.alphabets.push(e.toUpperCase());
          newString.push(e);
        } else {
          result.special_characters.push(e);
        }
      });
      result.sum = sum.toString();
      const reversed = newString.join("").split("").reverse();
      result.new_string = reversed.map((ch, i) =>
        i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
      ).join("");
  
      res.status(200).json(result);
}
catch{
    return res.status(400).json({
        is_success: false,
       
      });
}
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
