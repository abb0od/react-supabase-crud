const { supabase } = require("./supabaseClient.test"); // use require instead of import

const request = require("supertest");
const app = require("./index");


let TOKEN;

 beforeAll(async () => {
  // Sign in as a real user
  const { data: { session }, error } = await supabase.auth.signInWithPassword({
    email: "abedelraoufabboud@gmail.com",
    password: "P@ssw0rd",
  });

  if (error) throw new Error(error.message);
  if (!session) throw new Error("Failed to get session");

  TOKEN = session.access_token;
});

 describe("Todos API with auth", () => {

  it("GET /todos should return an array when authenticated", async () => {
    const res = await request(app)
      .get("/todos")
      .set("Authorization", `Bearer ${TOKEN}`);
    
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

it("POST /todos should create a new todo", async () => {
  const res = await request(app)
    .post("/todos")
    .set("Authorization", `Bearer ${TOKEN}`)
    .send({ title: "Test todo" });
 expect(res.statusCode).toBe(200);
});

});
