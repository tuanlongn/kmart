import { builder } from "../builder";

import "./user";
import "./product";
import "./cart";
import "./order";

builder.queryType({});
builder.mutationType({});

const schema = builder.toSchema({});

export default schema;
