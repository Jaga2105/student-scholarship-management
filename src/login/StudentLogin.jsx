import {
    TextInput,
    PasswordInput,
    Paper,
    Title,
    Text,
    Container,
    Button,
    Flex,
  } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
  import { Form, Link, useNavigate } from "react-router-dom";
  
  export default function StudentLogin() {
    const navigate=useNavigate()
    const form = useForm({
      validateInputOnChange: true,
      initialValues: {
        email: '',
        password: '',
      },
  
      validate: {
        email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
        password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
      },
    });

    const submitHandler=async(e)=>{
      // values.preventDefault()
      e.preventDefault()
      console.log(form.values.email)
      const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:form.values.email, password: form.values.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            navigate("studentdashboard");

        }
        else{
            alert("Invalid credentials");
        }
    }
    return (
      <Flex direction={"column"} align={"center"} p="xl">
        <Title 
        align="center"
        // sx={(theme) => ({
        //   fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        //   fontWeight: 900,
        // })}
      >
        Student Login
      </Title>
        <Paper withBorder shadow="md" p={"lg"} mt={"md"} radius="md" w="30%">
          <form onSubmit={submitHandler}>
          <TextInput label="Email" placeholder="Enter email" mt="md" required
           value={form.values.email}
           onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
           error={form.errors.email && 'Invalid email'}/>
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="xl"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
          />
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
          <Flex>
          <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
        </Text>
        <Link to="/register">
            <Text size="sm" align="center" mt={5}>Create account</Text>
          </Link>
          </Flex>
          </form>
        </Paper>
      </Flex>
    );
  }