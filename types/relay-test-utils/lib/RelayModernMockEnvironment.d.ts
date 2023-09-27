import {
    CacheConfig,
    ConcreteRequest,
    EnvironmentConfig,
    GraphQLResponse,
    GraphQLSingularResponse,
    GraphQLTaggedNode,
    IEnvironment,
    OperationDescriptor,
    Variables,
} from "relay-runtime";

export type OperationMockResolver = (operation: OperationDescriptor) => GraphQLResponse | Error | null;

export interface MockFunctions {
    clearCache: () => void;
    cachePayload: (
        request: ConcreteRequest | OperationDescriptor,
        variables: Variables,
        payload: GraphQLSingularResponse,
    ) => void;
    isLoading: (
        request: ConcreteRequest | OperationDescriptor,
        variables: Variables,
        cacheConfig?: CacheConfig,
    ) => boolean;
    reject: (request: ConcreteRequest | OperationDescriptor, error: Error | string) => void;
    nextValue: (request: ConcreteRequest | OperationDescriptor, payload: GraphQLSingularResponse) => void;
    complete: (request: ConcreteRequest | OperationDescriptor) => void;
    resolve: (request: ConcreteRequest | OperationDescriptor, payload: GraphQLSingularResponse) => void;
    getAllOperations: () => ReadonlyArray<OperationDescriptor>;
    findOperation: (findFn: (operation: OperationDescriptor) => boolean) => OperationDescriptor;
    queuePendingOperation: (query: GraphQLTaggedNode, variables: Variables) => void;
    getMostRecentOperation: () => OperationDescriptor;
    resolveMostRecentOperation: (
        payload: GraphQLSingularResponse | ((operation: OperationDescriptor) => GraphQLSingularResponse),
    ) => void;
    rejectMostRecentOperation: (error: Error | ((operation: OperationDescriptor) => Error)) => void;
    queueOperationResolver: (resolver: OperationMockResolver) => void;
}

interface MockEnvironment {
    mock: MockFunctions;
    mockClear: () => void;
}

export interface RelayMockEnvironment extends MockEnvironment, IEnvironment {}

/**
 * Creates an instance of the `Environment` interface defined in
 * RelayStoreTypes with a mocked network layer.
 *
 * Usage:
 *
 * ```
 * const environment = RelayModernMockEnvironment.createMockEnvironment();
 * ```
 *
 * Mock API:
 *
 * Helpers are available as `environment.mock.<helper>`:
 *
 * - `isLoading(query, variables): boolean`: Determine whether the given query
 *   is currently being loaded (not yet rejected/resolved).
 * - `reject(query, error: Error): void`: Reject a query that has been fetched
 *   by the environment.
 * - `resolve(query, payload: PayloadData): void`: Resolve a query that has been
 *   fetched by the environment.
 * - `nextValue(...) - will add payload to the processing, but won't complete
 *   the request ()
 * - getAllOperations() - every time there is an operation created by
 *   the Relay Component (query, mutation, subscription) this operation will be
 *   added to the internal list on the Mock Environment. This method will return
 *   an array of all pending operations in the order they occurred.
 * - findOperation(findFn) - should find operation if findFn(...) return `true`
 *   for it. Otherwise, it will throw.
 * - getMostRecentOperation(...) - should return the most recent operation
 *   generated by Relay Component.
 * - resolveMostRecentOperation(...) - is accepting `GraphQLSingularResponse` or a
 *   callback function that will receive `operation` and should return
 *  `GraphQLSingularResponse`
 * - rejectMostRecentOperation(...) - should reject the most recent operation
 *   with a specific error
 */
export function createMockEnvironment(config?: Partial<EnvironmentConfig>): RelayMockEnvironment;

export {};
