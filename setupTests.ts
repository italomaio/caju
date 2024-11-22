import "@testing-library/jest-dom";
import "jest-styled-components";

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

module.exports = {};
