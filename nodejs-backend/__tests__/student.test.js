const mongoose = require("mongoose");
const request = require("supertest");

const authService = require('../services/auth.services');
const studentService = require('../services/student.services');

const app = require('../app');

// Connecting to MongoDB before each test
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  .then(
    () => {console.log("Connection to MongoDB established for Jest")},
    err => {console.log("Failed to connect to MongoDB for Jest", err)}
  )
});

// Close connection to MongoDB 
afterEach(async () => {
  await mongoose.connection.close();
});

describe("Requests for /api/students", ()=> {

  let token;

  beforeAll(() => {
    user = {
      username: "admin", 
      email: "admin@aueb.gr",
      roles: ["EDITOR", "READER", "ADMIN"]
    };
    token = authService.generateAccessToken(user);
  });

  it("GET Returns all students", async ()=> {
    const res = await request(app)
    .get('/api/students')
    .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data.length).toBeGreaterThan(0);
  }, 50000);

  it("POST Creates a new student", async() => {
    const res = await request(app)
      .post('/api/students')
      .set('Authorization', `Bearer ${token}`)
      .send({
        "username": "jestStudent",
        "password": "12345",
        "firstname": "jest",
        "lastname": "student",
        "age": 20,
        "email": "reneeeee@aueb.gr",
        "address": {
            "area": "area12",
            "road": "road12"
        },
        "phone": {
            "type": "home",
            "number": "12345678"
        }
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBeTruthy();
  }, 50000)

    it("POST Creates a student that exists", async() => {
      const res = await request(app)
        .post('/api/students')
        .set('Authorization', `Bearer ${token}`)
        .send({
            "username": "jestStudent",
            "password": "12345",
            "firstname": "jest",
            "lastname": "student",
            "age": 20,
            "email": "reneeeee2@aueb.gr",
            "address": {
                "area": "area12",
                "road": "road12"
            },
            "phone": {
                "type": "home",
                "number": "12345678"
            }
        })
  
        expect(res.statusCode).toBe(400);
        expect(res.body.status).not.toBeTruthy();
    })
  
    it("Post Creates a student with email that already exists", async() => {
      const res = await request(app)
        .post('/api/students')
        .set('Authorization', `Bearer ${token}`)
        .send({
            "username": "jestStudent2",
            "password": "12345",
            "firstname": "jest",
            "lastname": "student",
            "age": 20,
            "email": "reneeeee@aueb.gr",
            "address": {
                "area": "area12",
                "road": "road12"
            },
            "phone": {
                "type": "home",
                "number": "12345678"
            }
        })
  
        expect(res.statusCode).toBe(400);
        expect(res.body.status).not.toBeTruthy();
    });

  it("Update a student", async() => {
    const result = await studentService.findLastInsertedStudent();

    const res = await request(app)
      .patch('/api/students')
      .set('Authorization', `Bearer ${token}`)
      .send({
        "username": result.username,
        "firstname": "new updated firstname",
        "lastname": "new updates lastname",
        "email": "updated@aueb.gr",
        "address": {
            "area": "area12",
            "road": "road12"
        },
        "phone": {
            "type": "home",
            "number": "12345678"
        }
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBeTruthy();
  })
});

describe("Requests for /api/students/:username", () => {
  let token;

  beforeAll(() => {
    user = {
      username: "admin", 
      email: "admin@aueb.gr",
      roles: ["ADMIN"]
    };
    token = authService.generateAccessToken(user);
  });

  it("Get returns specific student", async() => {

    const result = await studentService.findLastInsertedStudent();
    console.log("RESULT>>", result);

    const res = await request(app)
    .get('/api/students/'+result.username)
    .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data.username).toBe(result.username);
  })

  it("DELETE delete a student", async() => {
      const result = await studentService.findLastInsertedStudent();
  
      const res = await request(app)
        .delete('/api/students/'+result.username)
        .set('Authorization', `Bearer ${token}`)
  
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
    })

})