import "@testing-library/jest-dom";
import "jest-styled-components";
import { httpClient } from "./src/core/http/HttpClient";
import {
  useIsFetching,
  useIsMutating,
  useQueryClient,
} from "@tanstack/react-query";

jest.mock("./src/core/http/HttpClient", () => ({
  httpClient: {
    request: jest.fn(),
  },
}));

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));

jest.mock("styled-components", () => jest.requireActual("styled-components"));

jest.mock("@tanstack/react-query", () => {
  const originalModule = jest.requireActual("@tanstack/react-query");
  return {
    ...originalModule,
    useQueryClient: jest.fn(() => ({
      invalidateQueries: jest.fn(),
    })),
    useIsFetching: jest.fn().mockResolvedValue(() => 1),
    useIsMutating: jest.fn().mockResolvedValue(() => 1),
  };
});

// jest.mock("~/configs/axios", () => ({
//   axiosInstance: {
//     ...jest.requireActual("~/configs/axios"),
//     request: jest.fn(),
//   },
// }));

module.exports = {};
