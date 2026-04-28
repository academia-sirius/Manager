import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CentroModel = runtime.Types.Result.DefaultSelection<Prisma.$CentroPayload>;
export type AggregateCentro = {
    _count: CentroCountAggregateOutputType | null;
    _avg: CentroAvgAggregateOutputType | null;
    _sum: CentroSumAggregateOutputType | null;
    _min: CentroMinAggregateOutputType | null;
    _max: CentroMaxAggregateOutputType | null;
};
export type CentroAvgAggregateOutputType = {
    id: number | null;
};
export type CentroSumAggregateOutputType = {
    id: number | null;
};
export type CentroMinAggregateOutputType = {
    id: number | null;
    email: string | null;
    senha: string | null;
    nome: string | null;
    tipo: string | null;
    logo: string | null;
    slogan: string | null;
    descricao: string | null;
    createdAt: Date | null;
};
export type CentroMaxAggregateOutputType = {
    id: number | null;
    email: string | null;
    senha: string | null;
    nome: string | null;
    tipo: string | null;
    logo: string | null;
    slogan: string | null;
    descricao: string | null;
    createdAt: Date | null;
};
export type CentroCountAggregateOutputType = {
    id: number;
    email: number;
    senha: number;
    nome: number;
    tipo: number;
    logo: number;
    slogan: number;
    descricao: number;
    createdAt: number;
    _all: number;
};
export type CentroAvgAggregateInputType = {
    id?: true;
};
export type CentroSumAggregateInputType = {
    id?: true;
};
export type CentroMinAggregateInputType = {
    id?: true;
    email?: true;
    senha?: true;
    nome?: true;
    tipo?: true;
    logo?: true;
    slogan?: true;
    descricao?: true;
    createdAt?: true;
};
export type CentroMaxAggregateInputType = {
    id?: true;
    email?: true;
    senha?: true;
    nome?: true;
    tipo?: true;
    logo?: true;
    slogan?: true;
    descricao?: true;
    createdAt?: true;
};
export type CentroCountAggregateInputType = {
    id?: true;
    email?: true;
    senha?: true;
    nome?: true;
    tipo?: true;
    logo?: true;
    slogan?: true;
    descricao?: true;
    createdAt?: true;
    _all?: true;
};
export type CentroAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CentroWhereInput;
    orderBy?: Prisma.CentroOrderByWithRelationInput | Prisma.CentroOrderByWithRelationInput[];
    cursor?: Prisma.CentroWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CentroCountAggregateInputType;
    _avg?: CentroAvgAggregateInputType;
    _sum?: CentroSumAggregateInputType;
    _min?: CentroMinAggregateInputType;
    _max?: CentroMaxAggregateInputType;
};
export type GetCentroAggregateType<T extends CentroAggregateArgs> = {
    [P in keyof T & keyof AggregateCentro]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCentro[P]> : Prisma.GetScalarType<T[P], AggregateCentro[P]>;
};
export type CentroGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CentroWhereInput;
    orderBy?: Prisma.CentroOrderByWithAggregationInput | Prisma.CentroOrderByWithAggregationInput[];
    by: Prisma.CentroScalarFieldEnum[] | Prisma.CentroScalarFieldEnum;
    having?: Prisma.CentroScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CentroCountAggregateInputType | true;
    _avg?: CentroAvgAggregateInputType;
    _sum?: CentroSumAggregateInputType;
    _min?: CentroMinAggregateInputType;
    _max?: CentroMaxAggregateInputType;
};
export type CentroGroupByOutputType = {
    id: number;
    email: string;
    senha: string;
    nome: string;
    tipo: string;
    logo: string | null;
    slogan: string | null;
    descricao: string | null;
    createdAt: Date;
    _count: CentroCountAggregateOutputType | null;
    _avg: CentroAvgAggregateOutputType | null;
    _sum: CentroSumAggregateOutputType | null;
    _min: CentroMinAggregateOutputType | null;
    _max: CentroMaxAggregateOutputType | null;
};
export type GetCentroGroupByPayload<T extends CentroGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CentroGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CentroGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CentroGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CentroGroupByOutputType[P]>;
}>>;
export type CentroWhereInput = {
    AND?: Prisma.CentroWhereInput | Prisma.CentroWhereInput[];
    OR?: Prisma.CentroWhereInput[];
    NOT?: Prisma.CentroWhereInput | Prisma.CentroWhereInput[];
    id?: Prisma.IntFilter<"Centro"> | number;
    email?: Prisma.StringFilter<"Centro"> | string;
    senha?: Prisma.StringFilter<"Centro"> | string;
    nome?: Prisma.StringFilter<"Centro"> | string;
    tipo?: Prisma.StringFilter<"Centro"> | string;
    logo?: Prisma.StringNullableFilter<"Centro"> | string | null;
    slogan?: Prisma.StringNullableFilter<"Centro"> | string | null;
    descricao?: Prisma.StringNullableFilter<"Centro"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Centro"> | Date | string;
};
export type CentroOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    senha?: Prisma.SortOrder;
    nome?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    logo?: Prisma.SortOrderInput | Prisma.SortOrder;
    slogan?: Prisma.SortOrderInput | Prisma.SortOrder;
    descricao?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CentroWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    email?: string;
    AND?: Prisma.CentroWhereInput | Prisma.CentroWhereInput[];
    OR?: Prisma.CentroWhereInput[];
    NOT?: Prisma.CentroWhereInput | Prisma.CentroWhereInput[];
    senha?: Prisma.StringFilter<"Centro"> | string;
    nome?: Prisma.StringFilter<"Centro"> | string;
    tipo?: Prisma.StringFilter<"Centro"> | string;
    logo?: Prisma.StringNullableFilter<"Centro"> | string | null;
    slogan?: Prisma.StringNullableFilter<"Centro"> | string | null;
    descricao?: Prisma.StringNullableFilter<"Centro"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Centro"> | Date | string;
}, "id" | "email">;
export type CentroOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    senha?: Prisma.SortOrder;
    nome?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    logo?: Prisma.SortOrderInput | Prisma.SortOrder;
    slogan?: Prisma.SortOrderInput | Prisma.SortOrder;
    descricao?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.CentroCountOrderByAggregateInput;
    _avg?: Prisma.CentroAvgOrderByAggregateInput;
    _max?: Prisma.CentroMaxOrderByAggregateInput;
    _min?: Prisma.CentroMinOrderByAggregateInput;
    _sum?: Prisma.CentroSumOrderByAggregateInput;
};
export type CentroScalarWhereWithAggregatesInput = {
    AND?: Prisma.CentroScalarWhereWithAggregatesInput | Prisma.CentroScalarWhereWithAggregatesInput[];
    OR?: Prisma.CentroScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CentroScalarWhereWithAggregatesInput | Prisma.CentroScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Centro"> | number;
    email?: Prisma.StringWithAggregatesFilter<"Centro"> | string;
    senha?: Prisma.StringWithAggregatesFilter<"Centro"> | string;
    nome?: Prisma.StringWithAggregatesFilter<"Centro"> | string;
    tipo?: Prisma.StringWithAggregatesFilter<"Centro"> | string;
    logo?: Prisma.StringNullableWithAggregatesFilter<"Centro"> | string | null;
    slogan?: Prisma.StringNullableWithAggregatesFilter<"Centro"> | string | null;
    descricao?: Prisma.StringNullableWithAggregatesFilter<"Centro"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Centro"> | Date | string;
};
export type CentroCreateInput = {
    email: string;
    senha: string;
    nome: string;
    tipo: string;
    logo?: string | null;
    slogan?: string | null;
    descricao?: string | null;
    createdAt?: Date | string;
};
export type CentroUncheckedCreateInput = {
    id?: number;
    email: string;
    senha: string;
    nome: string;
    tipo: string;
    logo?: string | null;
    slogan?: string | null;
    descricao?: string | null;
    createdAt?: Date | string;
};
export type CentroUpdateInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    senha?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.StringFieldUpdateOperationsInput | string;
    logo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slogan?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descricao?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CentroUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    senha?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.StringFieldUpdateOperationsInput | string;
    logo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slogan?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descricao?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CentroCreateManyInput = {
    id?: number;
    email: string;
    senha: string;
    nome: string;
    tipo: string;
    logo?: string | null;
    slogan?: string | null;
    descricao?: string | null;
    createdAt?: Date | string;
};
export type CentroUpdateManyMutationInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    senha?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.StringFieldUpdateOperationsInput | string;
    logo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slogan?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descricao?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CentroUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    senha?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.StringFieldUpdateOperationsInput | string;
    logo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slogan?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descricao?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CentroCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    senha?: Prisma.SortOrder;
    nome?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    logo?: Prisma.SortOrder;
    slogan?: Prisma.SortOrder;
    descricao?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CentroAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type CentroMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    senha?: Prisma.SortOrder;
    nome?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    logo?: Prisma.SortOrder;
    slogan?: Prisma.SortOrder;
    descricao?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CentroMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    senha?: Prisma.SortOrder;
    nome?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    logo?: Prisma.SortOrder;
    slogan?: Prisma.SortOrder;
    descricao?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CentroSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type CentroSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    senha?: boolean;
    nome?: boolean;
    tipo?: boolean;
    logo?: boolean;
    slogan?: boolean;
    descricao?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["centro"]>;
export type CentroSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    senha?: boolean;
    nome?: boolean;
    tipo?: boolean;
    logo?: boolean;
    slogan?: boolean;
    descricao?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["centro"]>;
export type CentroSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    senha?: boolean;
    nome?: boolean;
    tipo?: boolean;
    logo?: boolean;
    slogan?: boolean;
    descricao?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["centro"]>;
export type CentroSelectScalar = {
    id?: boolean;
    email?: boolean;
    senha?: boolean;
    nome?: boolean;
    tipo?: boolean;
    logo?: boolean;
    slogan?: boolean;
    descricao?: boolean;
    createdAt?: boolean;
};
export type CentroOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "senha" | "nome" | "tipo" | "logo" | "slogan" | "descricao" | "createdAt", ExtArgs["result"]["centro"]>;
export type $CentroPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Centro";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        email: string;
        senha: string;
        nome: string;
        tipo: string;
        logo: string | null;
        slogan: string | null;
        descricao: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["centro"]>;
    composites: {};
};
export type CentroGetPayload<S extends boolean | null | undefined | CentroDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CentroPayload, S>;
export type CentroCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CentroFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CentroCountAggregateInputType | true;
};
export interface CentroDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Centro'];
        meta: {
            name: 'Centro';
        };
    };
    findUnique<T extends CentroFindUniqueArgs>(args: Prisma.SelectSubset<T, CentroFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CentroClient<runtime.Types.Result.GetResult<Prisma.$CentroPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CentroFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CentroFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CentroClient<runtime.Types.Result.GetResult<Prisma.$CentroPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CentroFindFirstArgs>(args?: Prisma.SelectSubset<T, CentroFindFirstArgs<ExtArgs>>): Prisma.Prisma__CentroClient<runtime.Types.Result.GetResult<Prisma.$CentroPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CentroFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CentroFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CentroClient<runtime.Types.Result.GetResult<Prisma.$CentroPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CentroFindManyArgs>(args?: Prisma.SelectSubset<T, CentroFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CentroPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CentroCreateArgs>(args: Prisma.SelectSubset<T, CentroCreateArgs<ExtArgs>>): Prisma.Prisma__CentroClient<runtime.Types.Result.GetResult<Prisma.$CentroPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CentroCreateManyArgs>(args?: Prisma.SelectSubset<T, CentroCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CentroCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CentroCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CentroPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CentroDeleteArgs>(args: Prisma.SelectSubset<T, CentroDeleteArgs<ExtArgs>>): Prisma.Prisma__CentroClient<runtime.Types.Result.GetResult<Prisma.$CentroPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CentroUpdateArgs>(args: Prisma.SelectSubset<T, CentroUpdateArgs<ExtArgs>>): Prisma.Prisma__CentroClient<runtime.Types.Result.GetResult<Prisma.$CentroPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CentroDeleteManyArgs>(args?: Prisma.SelectSubset<T, CentroDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CentroUpdateManyArgs>(args: Prisma.SelectSubset<T, CentroUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CentroUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CentroUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CentroPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CentroUpsertArgs>(args: Prisma.SelectSubset<T, CentroUpsertArgs<ExtArgs>>): Prisma.Prisma__CentroClient<runtime.Types.Result.GetResult<Prisma.$CentroPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CentroCountArgs>(args?: Prisma.Subset<T, CentroCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CentroCountAggregateOutputType> : number>;
    aggregate<T extends CentroAggregateArgs>(args: Prisma.Subset<T, CentroAggregateArgs>): Prisma.PrismaPromise<GetCentroAggregateType<T>>;
    groupBy<T extends CentroGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CentroGroupByArgs['orderBy'];
    } : {
        orderBy?: CentroGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CentroGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCentroGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CentroFieldRefs;
}
export interface Prisma__CentroClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CentroFieldRefs {
    readonly id: Prisma.FieldRef<"Centro", 'Int'>;
    readonly email: Prisma.FieldRef<"Centro", 'String'>;
    readonly senha: Prisma.FieldRef<"Centro", 'String'>;
    readonly nome: Prisma.FieldRef<"Centro", 'String'>;
    readonly tipo: Prisma.FieldRef<"Centro", 'String'>;
    readonly logo: Prisma.FieldRef<"Centro", 'String'>;
    readonly slogan: Prisma.FieldRef<"Centro", 'String'>;
    readonly descricao: Prisma.FieldRef<"Centro", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Centro", 'DateTime'>;
}
export type CentroFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CentroSelect<ExtArgs> | null;
    omit?: Prisma.CentroOmit<ExtArgs> | null;
    where: Prisma.CentroWhereUniqueInput;
};
export type CentroFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CentroSelect<ExtArgs> | null;
    omit?: Prisma.CentroOmit<ExtArgs> | null;
    where: Prisma.CentroWhereUniqueInput;
};
export type CentroFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CentroSelect<ExtArgs> | null;
    omit?: Prisma.CentroOmit<ExtArgs> | null;
    where?: Prisma.CentroWhereInput;
    orderBy?: Prisma.CentroOrderByWithRelationInput | Prisma.CentroOrderByWithRelationInput[];
    cursor?: Prisma.CentroWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CentroScalarFieldEnum | Prisma.CentroScalarFieldEnum[];
};
export type CentroFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CentroSelect<ExtArgs> | null;
    omit?: Prisma.CentroOmit<ExtArgs> | null;
    where?: Prisma.CentroWhereInput;
    orderBy?: Prisma.CentroOrderByWithRelationInput | Prisma.CentroOrderByWithRelationInput[];
    cursor?: Prisma.CentroWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CentroScalarFieldEnum | Prisma.CentroScalarFieldEnum[];
};
export type CentroFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CentroSelect<ExtArgs> | null;
    omit?: Prisma.CentroOmit<ExtArgs> | null;
    where?: Prisma.CentroWhereInput;
    orderBy?: Prisma.CentroOrderByWithRelationInput | Prisma.CentroOrderByWithRelationInput[];
    cursor?: Prisma.CentroWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CentroScalarFieldEnum | Prisma.CentroScalarFieldEnum[];
};
export type CentroCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CentroSelect<ExtArgs> | null;
    omit?: Prisma.CentroOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CentroCreateInput, Prisma.CentroUncheckedCreateInput>;
};
export type CentroCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CentroCreateManyInput | Prisma.CentroCreateManyInput[];
};
export type CentroCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CentroSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CentroOmit<ExtArgs> | null;
    data: Prisma.CentroCreateManyInput | Prisma.CentroCreateManyInput[];
};
export type CentroUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CentroSelect<ExtArgs> | null;
    omit?: Prisma.CentroOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CentroUpdateInput, Prisma.CentroUncheckedUpdateInput>;
    where: Prisma.CentroWhereUniqueInput;
};
export type CentroUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CentroUpdateManyMutationInput, Prisma.CentroUncheckedUpdateManyInput>;
    where?: Prisma.CentroWhereInput;
    limit?: number;
};
export type CentroUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CentroSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CentroOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CentroUpdateManyMutationInput, Prisma.CentroUncheckedUpdateManyInput>;
    where?: Prisma.CentroWhereInput;
    limit?: number;
};
export type CentroUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CentroSelect<ExtArgs> | null;
    omit?: Prisma.CentroOmit<ExtArgs> | null;
    where: Prisma.CentroWhereUniqueInput;
    create: Prisma.XOR<Prisma.CentroCreateInput, Prisma.CentroUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CentroUpdateInput, Prisma.CentroUncheckedUpdateInput>;
};
export type CentroDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CentroSelect<ExtArgs> | null;
    omit?: Prisma.CentroOmit<ExtArgs> | null;
    where: Prisma.CentroWhereUniqueInput;
};
export type CentroDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CentroWhereInput;
    limit?: number;
};
export type CentroDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CentroSelect<ExtArgs> | null;
    omit?: Prisma.CentroOmit<ExtArgs> | null;
};
