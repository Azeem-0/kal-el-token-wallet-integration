import { CONTRACT_ADDRESS, TOKEN_ABI } from "@/constants";
import { useState } from "react";
import { useWriteContract } from "wagmi";
import { toaster } from "../ui/toaster";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { Button } from "../ui/button";

export default function UnPauseTokenOperations() {
    const [isLoading, setIsLoading] = useState(false);
    const { writeContract } = useWriteContract();

    const handleUnpause = async () => {
        setIsLoading(true);
        try {
            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: 'unpause',
                args: [],
            });

            toaster.create({
                title: 'Token Unpaused',
                description: 'The token has been unpaused successfully.',
                type: 'success',
                duration: 3000,
            });
        } catch (error) {
            toaster.create({
                title: 'Error',
                description: 'Failed to unpause the token.',
                type: 'error',
                duration: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            p={3}
            borderWidth={1}
            borderRadius="md"
            boxShadow="md"
            bg="white"
            maxW="md"
            mx="auto"
            mt={2}
            textAlign="center"
        >
            <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={2}>
                Unpause Token
            </Text>
            <Button
                bg="blue.600"
                colorScheme="blue"
                onClick={handleUnpause}
                loading={isLoading}
                loadingText="Unpausing"
                width="full"
                _hover={{ bg: 'blue.500' }}
                _active={{ bg: 'blue.700' }}
                mt={2}
                py={2}
                borderRadius="md"
                fontSize="md"
            >
                Unpause Token
            </Button>
            {isLoading && <Spinner size="sm" mt={2} color="blue.500" />}
            {!isLoading && (
                <Text color="blue.500" mt={3}>
                    Successfully unpaused the token.
                </Text>
            )}
        </Box>
    );

}