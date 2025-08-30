const m2s = require('mongoose-to-swagger');
const Student = require('./models/student.model');
const Class = require('./models/class.model');

exports.options = {
  "components": {
    "schemas": {
      Student: m2s(Student),
      Class: m2s(Class)
    },
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  },
  "security": [
    {"bearerAuth":[]}
  ],
  "openapi":"3.1.0",
  "info":{
    "version": "1.0.0",
    "title": "Student and Classes CRUD API",
    "description":"An eclass-like application for creating students and classes.",
    "contact": {
      "name": "Despoina Moschokarfi",
      "email":"despinamx16@aueb.gr"
    }
  },
  "servers": [
    {
      url:"http://localhost:3000",
      description:"Local Server"
    }
  ],
  "tags": [
    {
      "name": "Students",
      "description": "Endpoints for students."
    },
    {
      "name": "Classes",
      "description": "Endpoints for classes."
    },
    {
      "name": "Students and classes",
      "description": "Endpoints for students and the classes they are enrolled in."
    },
    {
      "name":"Auth",
      "description": "Endpoints for Authentication"
    }
  ],
  "paths": {
    "/api/students": {
      "get": {
        "tags":["Students"],
        "description":"Returns a list of all students",
        "responses":{
          "200":{
            "description": "List of all students",
            "content": {
              "application/json": {
                "schema": {
                  "type":"array",
                  "items": {
                    "$ref":"#/components/schemas/Student"
                  }
                }
              }
            }
          }
        }
      },
      "post":{
        "tags": ["Students"],
        "description": "Data of student that we want to create",
        "requestBody":{
          "description": "JSON with student data",
          "content": {
            "application/json": {
              "schema":{
                "type":"object",
                "properties":{
                  "username": {"type":"string"},
                  "password": {"type":"string"},
                  "firstname": {"type": "string"},
                  "lastname": {"type":"string"},
                  "email": {"type":"string"},
                  "address": {
                    "type": "object",
                    "properties": {
                      "area": {"type":"string"},
                      "road": {"type":"string"}
                    }
                  },
                  "phone": {
                    "type":"array",
                    "items": {
                      "type": "object",
                      "properties":{
                        "type": {"type": "string"},
                        "number": {"type": "number"}
                      }
                    }
                  },
                  "classes": {
                    "type":"array",
                    "items": {
                      "type":"object",
                      "properties": {
                        "class": {"type": "string"},
                        "hours": {"type": "number"},
                        "ects": {"type": "nNumber"}
                      }
                    }
                  }
                },
                "required":["username", "password", "firstname", "lastname", "email", "address"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "JSON of new student"
          }
        }
      },
      "patch":{
        "tags": ["Students"],
        "description": "Update student",
        "parameters":[
          {
            "name":"username",
            "in":"body",
            "required":true,
            "description": "Username of user that will be updated.",
            "type":"string"
          }
        ],
        "requestBody":{
          "description":"Data of student to update",
          "content": {
            "application/json":{
              "schema": {
                "type":"object",
                "properties":{
                  "username": {"type":"string"},
                  "name": {"type":"string"},
                  "surname": {"type":"string"},
                  "email":{"type": "string"},
                  "address": {
                    "type":"object",
                    "properties":{
                      "area": {"type": "string"},
                      "road": {"type": "string"}
                    }
                  },
                  "phone": {
                    "type":"array",
                    "items": {
                      "type": "object",
                      "properties":{
                        "type": {"type": "string"},
                        "number": {"type": "number"}
                      }
                    }
                  }
                },
                "required": ["email"]
              }
            }
          }
        },
        "responses":{
          "200":{
            "descripiton": "Update student"
          }
        }
      }
    },
    "/api/students/{username}":{
      "get": {
        "tags": ["Students"],
        "parameters": [
          {
            "name": "username",
            "in":"path",
            "required":true,
            "description": "Username of student whose details the request will return.",
            "type": "string"
          }
        ],
        "description": "Returns student's details for specific username",
        "responses": {
          "200": {
            "description": "Student details",
            "content":{
              "application/json":{
                "schema": {
                  "$ref":"#/components/schemas/Student"
                }
              }
            }            
          }
        }
      },
      "delete": {
        "tags": ["Students"],
        "description": "Delete student from Database",
        "parameters": [
          {
            "name": "username",
            "in":"path",
            "description": "User to delete",
            "type": "string",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description":"Delete a student"
          }
        }
      }
    },
    "/api/classes": {
      "get": {
        "tags":["Classes"],
        "description":"Returns a list of all classes",
        "responses":{
          "200":{
            "description": "List of all classes",
            "content": {
              "application/json": {
                "schema": {
                  "type":"array",
                  "items": {
                    "$ref":"#/components/schemas/Class"
                  }
                }
              }
            }
          }
        }
      },
      "post":{
        "tags": ["Classes"],
        "description": "Data of class that we want to create",
        "requestBody":{
          "description": "JSON with class data",
          "content": {
            "application/json": {
              "schema":{
                "type":"object",
                "properties":{
                  "class": {"type":"string"},
                  "hours": {"type":"number"},
                  "ects": {"type": "number"},
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "JSON of new class"
          }
        }
      },
      "patch":{
        "tags": ["Classes"],
        "description": "Update class",
        "parameters":[
          {
            "name":"class",
            "in":"body",
            "required":true,
            "description": "Name of class that will be updated.",
            "type":"string"
          }
        ],
        "requestBody":{
          "description":"Data of class to update",
          "content": {
            "application/json":{
              "schema": {
                "type":"object",
                "properties":{
                  "hours": {"type":"number"},
                  "ects": {"type":"number"}
                }
              }
            }
          }
        },
        "responses":{
          "200":{
            "description": "Update class."
          }
        }
      }
    },
    "/api/classes/{className}":{
      "get": {
        "tags": ["Classes"],
        "parameters": [
          {
            "name": "className",
            "in":"path",
            "required":true,
            "description": "Name of class whose details the request will return.",
            "type": "string"
          }
        ],
        "description": "Returns class' details for specific class name",
        "responses": {
          "200": {
            "description": "Class details",
            "content":{
              "application/json":{
                "schema": {
                  "$ref":"#/components/schemas/Class"
                }
              }
            }            
          }
        }
      },
      "delete": {
        "tags": ["Classes"],
        "description": "Delete class from Database.",
        "parameters": [
          {
            "name": "className",
            "in":"path",
            "description": "Class to delete.",
            "type": "string",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description":"Delete a class."
          }
        }
      }
    },
    "/api/auth/login": {
      "post": {
        "tags": ["Auth"],
        "description": "Login User",
        "requestBody": {
          "description": "Users login with their username and password and a jwt token is sent in response.",
          "content": {
            "application/json":{
              "schema": {
                "type": "object",
                "properties": {
                  "username": { "type": "string" },
                  "password": { "type": "string" }
                },
                "required": ["username", "password"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Token returned"
          }
        }
      }
    },
    "/api/student-class":{
      "get": {
        "tags": ["Students and classes"],
        "responses":{
          "200": {
            "description": "Returns all classes that every student is enrolled in.",
            "schema":{
              "$ref": "#/components/schemas/Student"
            }
          }
        }
      }
    },
    "/api/student-class/{username}":{
      "get": {
        "tags": ["Students and classes"],
        "parameters": [
          {
            "name":"username",
            "in":"path",
            "required": true,
            "description": "Username of student whose classes the request will return.",
            "type": "string"
          }
        ],
        "responses":{
          "200": {
            "description": "Returns the classes that the student with the specified username is enrolled in.",
            "schema":{
              "$ref": "#/components/schemas/Student"
            }
          }
        }
      }
    },
    "/api/student-class":{
      "get": {
        "tags": ["Students and classes"],
        "responses":{
          "200": {
            "description": "Gets all students and the classes they are enrolled in.",
            "schema":{
              "$ref": "#/components/schemas/Student"
            }
          }
        }
      },
      "post": {
        "tags": ["Students and classes"],
        "responses":{
          "200": {
            "description": "Enrolls Student in a new class.",
            "schema":{
              "$ref": "#/components/schemas/Student"
            }
          }
        }
      },
      "patch": {
        "tags": ["Students and classes"],
        "parameters": [
          {
            "name":"username",
            "in":"body",
            "required": true,
            "description": "Username of Student whose classes will be updated.",
            "type": "string"
          }
        ],
        "responses":{
          "200": {
            "description": "Updates the enrolled classes of a Student.",
            "schema":{
              "$ref": "#/components/schemas/Student"
            }
          }
        }
      }
    },
    "/api/student-class/{username}/classes/{className}":{
      "delete": {
        "tags": ["Students and classes"],
        "parameters": [
          {
            "name":"username",
            "in":"path",
            "required": true,
            "description": "Username of Student",
            "type": "string"
          },
          {
            "name":"className",
            "in":"path",
            "required": true,
            "description": "Class that will be deleted from Student's classes.",
            "type": "string"
          }
        ],
        "responses":{
          "200": {
            "description": "Deletes a class from Student's enrolled classes.",
            "schema":{
              "$ref": "#/components/schemas/Student"
            }
          }
        }
      }
    }
  }
}