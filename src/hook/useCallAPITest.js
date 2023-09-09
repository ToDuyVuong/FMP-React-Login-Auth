import { useTestMutation } from "../redux/slices/userSlice";

export function useCallAPITest() {
  const [test] = useTestMutation();

  async function callAPITest(token) {
    try {
      const response = await test(token).unwrap();
      return response;
    } catch (error) {
      return error;
    }
  }

  return callAPITest;
}
