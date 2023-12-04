import {
    Box, Button, Link, Flex, FormControl, FormLabel, Heading,
    Input, Stack, useColorMode, useColorModeValue
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsSun, BsMoonStarsFill } from 'react-icons/bs'
import httpClient from '../../../httpClient'

export default function RegisterAdmin() {
    return (
        <Flex
            minHeight={'100vh'}
            p={{ base: "1rem", lg: "4rem" }}
            mx={'auto'}
            align={'center'}
            justifyContent={'center'}
            bg={useColorModeValue('white', 'gray.700')}
        >
            <Box
                p={4}
                w={{ base: "100%", lg: "50%" }}
                maxWidth={'500px'}
                borderRadius={5}
                textAlign={'center'}
                boxShadow={'lg'}
            >
                <ColorModeToggle />
                <Box p={4}>
                    <RegisterHeader />
                    <RegisterForm />
                </Box>
            </Box>
        </Flex>
    )
}


function ColorModeToggle() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Box textAlign={'right'} py={4}>
            <Button
                bg={'transparent'}
                aria-label="Toggle Color Mode"
                onClick={toggleColorMode}
                _focus={{ boxShadow: 'none' }}>
                {colorMode === 'light' ? <BsMoonStarsFill /> : <BsSun />}
            </Button>
        </Box>
    )
}

const RegisterHeader = () => {
    return (
        <Box textAlign={'center'}>
            <Heading>Créez un nouveau compte</Heading>
        </Box>
    )
}

const RegisterForm = () => {
    const [email, setEmail] = useState([])
    const [password, setPassword] = useState([])

    const regisInAdmin = async () => {
        try {
            const resp = await httpClient.post("http://127.0.0.1:5000/registerAdmin", {
                email,
                password
            })
            window.location.href = "/adminDashboard"
        } catch (error) {
            if (error.response.status === 409) {
                alert("La connexion a échouée. Réessayez plus tard!")
            }
        }
    }
    return (
        <Box my={8} textAlign={'left'}>
            <form>
                <FormControl>
                    <FormLabel>Adresse Email</FormLabel>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        placeholder='Entrez votre email svp!'
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Mot de passe</FormLabel>
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        placeholder='Entrez votre mot de passe svp!'
                    />
                </FormControl>
                <Button
                    onClick={() => regisInAdmin()}
                    variant={'solid'}
                    colorScheme='teal'
                    width={'full'}
                    mt={4}>
                    Connexion
                </Button>
                <Stack color='blue.400' mt={4} textAlign={'center'}>
                    <Link href="/registerAdmin" color='teal'>Vous n'avez pas de compte? Créez en!</Link>
                </Stack>

            </form>
        </Box>
    )
}
