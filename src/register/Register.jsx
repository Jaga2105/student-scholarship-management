import React from "react";
import { DateInput } from "@mantine/dates";
import {
  NumberInput,
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Stack,
  Select,
  createStyles,
  Flex,
} from "@mantine/core";
// import { IconChevronDown } from '@tabler/icons-react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";

const useStyles = createStyles((theme) => ({
  container_width: {
    // margin: "400px",
  },
  container: {
    width: "600px",
    margin: "200px",
  },
}));
const clg_names = [
  "OUTR",
  "VSSUT",
  "SOA",
  "ITER",
  "C.V.Raman",
  "KIIT",
  "Silicon",
];

const Register = () => {
  const navigate=useNavigate()
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      name: "",
      email: "",
      dob: "",
      phone: "",
      clg_name:"",
      rollno:"",
      password: "",
      confirmPassword:""
    },

    validate: {
      name: (val) =>
        val.length <= 4 ? "Name should include atleast 4 characters" : null,
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      dob:(val)=>
        val===""
        ?"DOB is required"
        :(Number(val)<16 || Number(val)>23)
        ? "Invalid age"
        :null,
      phone:(val)=>
        (val=== ""
          ? "Phone no. is required"
          : (val.length<10 || val.length>10)
          ? "Phone number must be of exact 10 digits"
          : null),
      // clg_name:(val)=>
      //   val===""
      //     ? "College name is required"
      //     :null,
      rollno:(val)=>
        val===""
          ?"Roll no. is required"
          :val.length<6 || val.length>6
          ? "Roll number must be of 6 characters"
          : null,
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
      confirmPassword: (val, values) =>
      val !== values.password ? 'Passwords did not match' : null
    },
  });
  // const { classes } = useStyles();
  const submitHandler=async (e)=>{
    // values.preventDefault()
    e.preventDefault()
    const {name,email,password,phone,rollno}=form.values
    console.log(form.values)
    const response=await fetch("http://localhost:5000/api/auth/createuser",{
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({name,email,password,phone,rollno})
    })
    const json=await response.json()
    console.log(json)
    if(json.success){
      localStorage.setItem('token',json.authToken)
      navigate('/')
    }
    else{
      alert("Invalid Credentials")
    }
  }
  return (
    <Flex direction={"column"} align={"center"} p="xl">
      <Title align="center">Student Registration</Title>

      <Paper withBorder shadow="md" p={"lg"} mt={"md"} radius="md" w="40%">
        <form onSubmit={submitHandler}>
          <Stack>
            <TextInput
              label="Name"
              placeholder="Name"
              required
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              error={form.errors.name}
            />
            <TextInput
              label="Email"
              placeholder="you@mantine.dev"
              required
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
            />
            <DateInput
              label="Date of Birth"
              placeholder="Date input"
              // min={16}
              value={form.values.dob}
              // onChange={(event) =>
              //   form.setFieldValue("dob", event.currentTarget.value)
              // }
              // error={form.errors.dob && 'Invalid Date of Birth'}
            />
            <TextInput
              placeholder="Enter phone number"
              label="Phone No."
              required
              value={form.values.phone}
              onChange={(event) =>
                form.setFieldValue("phone", event.currentTarget.value)
              }
              error={form.errors.phone && "Invalid phone number"}
            />
            <Select
              label="College Name"
              placeholder="Pick one"
              // rightSection={<IconChevronDown size="1rem" />}
              // rightSectionWidth={30}
              // styles={{ rightSection: { pointerEvents: 'none' } }}
              data={clg_names}
              // required
              // value={form.values.clg_name}
              // onChange={(event) =>
              //   form.setFieldValue("clg_name", event.currentTarget.value)
              // }
              // error={form.errors.clg_name && "College name is required"}
              
            />
            <TextInput placeholder="Roll No." label="College Roll No." required
             value={form.values.rollno}
             onChange={(event) =>
               form.setFieldValue("rollno", event.currentTarget.value)
             }
             error={form.errors.rollno && "Invalid Roll No."}
             />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              // defaultValue="secret"
              required
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={form.errors.password && "Invalid Password"}
            />
            <PasswordInput
              label="Confirm password"
              placeholder="Re-enter password"
              // defaultValue="secret"
              value={form.values.confirmPassword}
              onChange={(event) =>
                form.setFieldValue("confirmPassword", event.currentTarget.value)
              }
              error={form.errors.confirmPassword && "Invalid Password"}
            />
          </Stack>
          <Button fullWidth mt="xl" type="submit">
            Sign Up
          </Button>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Already have an account ? <Link to={"/"}> Sign IN </Link>
          </Text>
        </form>
      </Paper>
    </Flex>
  );
};
export default Register;
