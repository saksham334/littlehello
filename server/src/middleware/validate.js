// validate.js — reusable middleware: check part of a request against a zod schema.
//
// Usage in a route (Part 6C):
//   router.post('/register', validate(registerSchema), registerController);
//
// ✅ Valid   → cleaned data is stored in req.validated.body, then next() runs the controller
// ❌ Invalid → 400 response with one friendly message per field; the controller never runs

// Turn zod's list of issues into { fieldName: 'first message for that field' }
function toFieldErrors(zodError) {
  const fields = {};
  for (const issue of zodError.issues) {
    const key = issue.path.join('.') || 'form'; // e.g. "email", or "form" for whole-object issues
    if (!fields[key]) fields[key] = issue.message; // keep only the first message per field
  }
  return fields;
}

// "source" lets us validate other parts later, e.g. validate(schema, 'query') for search filters.
export function validate(schema, source = 'body') {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      return res.status(400).json({
        error: 'A few details need a little fix.',
        details: toFieldErrors(result.error), // never echoes back what was sent (e.g. passwords)
      });
    }

    req.validated = { ...req.validated, [source]: result.data };
    next();
  };
}