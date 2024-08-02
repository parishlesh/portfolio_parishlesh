const {z} = require("zod");

const signupSchema = z.object({
    username: z.string({required_error: "Name is requried"}).trim().min(3, {message:"Username must be atleast 3 character"}).max(15, {message:"useername must not be morre than 15 character"}),
    
    email: z.string({required_error: "email is requried"}).trim().min(3, {message:"email must be in correct format"}),
    
    phone: z.string({required_error: "phone is requried"}).trim().min(10, {message:"phone must be atleast 10 digit"}),
    
    password: z.string({required_error: "password is requried"}).trim().min(6, {message:"password must be atleast 6 character"}).max(255, {message:"password must not be morre than 255 character"})

});


const loginSchema = z.object({
    email: z
      .string({ required_error: "Email is required." })
      .trim(),
      email: z.string({required_error: "email is requried"}).trim().min(3, {message:"email must be in correct format"}),
      password: z.string({required_error: "password is requried"}).trim().min(6, {message:"password must be atleast 6 character"}).max(255, {message:"password must not be morre than 255 character"})

  });


  const forgotPasswordSchema = z.object({
    email: z.string({ required_error: "Email is required" }).trim().email({ message: "Email must be in correct format" })
});

module.exports = {signupSchema, loginSchema, forgotPasswordSchema};