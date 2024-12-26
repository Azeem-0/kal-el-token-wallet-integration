import { useEffect, useState } from "react";
import { toaster } from "../ui/toaster";
import { Box, Flex, Heading, Input } from "@chakra-ui/react";
import { Button } from "../ui/button";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS, TOKEN_ABI } from "@/constants";

export default function ChangeOwnership() {

    const [newOwner, setNewOwner] = useState<string>("");

    const { data: hash, isPending, writeContract, isError, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: ifConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    useEffect(() => {
        if (isError) {
            toaster.create({
                title: "Error",
                description: `${error?.cause}`,
                type: "error",
                duration: 2000,
            });
        }
        if (ifConfirmed) {
            toaster.create({
                title: 'Success',
                description: 'Successfully changed ownership.',
                type: 'success',
                duration: 2000,
            });
            setNewOwner("");
        }
    }, [ifConfirmed, isError]);

    const loading = isPending || isConfirming;

    const changeOwnerShip = async () => {
        try {
            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: 'transferOwnership',
                args: [newOwner],
            });
        } catch (error) {
            console.error(error);
            toaster.create({
                title: 'Error',
                description: 'Failed to tranfer ownership.',
                type: 'error',
                duration: 2000,
            });
        }
    };

    return (
        <Flex direction="column" gap={4}>

            <Input
                color="black"
                placeholder="Change ownership"
                value={newOwner}
                onChange={(e) => setNewOwner(e.target.value)}
                bg="gray.100"
                borderColor="gray.300"
                pl="4"
                _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px #319795" }}
                _hover={{ borderColor: "teal.400" }}
            />
            <Button
                bg="teal.500"
                colorScheme="red"
                onClick={changeOwnerShip}
                loading={loading}
                loadingText="Transferring.."
                mt={4}
                _hover={{ bg: "teal.400" }}
                _active={{ bg: "teal.600" }}
            >
                Transfer Ownership
            </Button>
        </Flex>
    );


}