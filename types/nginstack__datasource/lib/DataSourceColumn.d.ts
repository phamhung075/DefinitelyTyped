export = DataSourceColumn;
declare function DataSourceColumn(name: string, type: string): void;
declare class DataSourceColumn {
    constructor(name: string, type: string);
    propertiesToAssign_: any;
    showGlobalActions: boolean;
    weight: string | null;
    coalesceValue: any;
    pivot: boolean;
    pathRoot: number | null;
    dimensionDataType_: string;
    dimensionDataSize_: number;
    pathDepth: number | null;
    pathHeight: number | null;
    format_: any;
    sort: string;
    name: string;
    distinct: boolean;
    notifyNameChange_(name: any): void;
    suggestAlias(): void;
    alias: string;
    private updateLevel_;
    level_: string;
    onBeforeAliasChange: (arg0: DataSourceColumn, arg1: string) => any;
    getLevel(): string;
    private format;
    getDimensionDataType(): string;
    getDimensionDataSize(): string;
    private getDepth;
    private setDepth;
    private getBackDepth;
    private setBackDepth;
    private getSource_;
    formatDimension(value: any): any;
    private updateDimensionDataType_;
    private updatePrefix_;
    prefix_: string;
    private updateFieldName_;
    fieldName_: any;
    fieldName: string;
    canonicalName: string;
    private updateCanonicalName_;
    canonicalName_: string;
    aggregate: string;
    toString(): string;
}
declare namespace DataSourceColumn {
    const AGGREGATE_NONE: string;
    const AGGREGATE_SUM: string;
    const AGGREGATE_COUNT: string;
    const AGGREGATE_AVG: string;
    const AGGREGATE_MAX: string;
    const AGGREGATE_MIN: string;
    const SORT_NONE: string;
    const SORT_ASC: string;
    const SORT_DESC: string;
    const DIMENSION_SEP: string;
    const aliasUniqueId_: number;
    function colNameFromField(fld: any, prefix: string): string;
    function fromField(fld: any, prefix: string): DataSourceColumn;
    function getRootFromLeafNode(leafNode: number, opt_suggestedRoot: number): number;
}
