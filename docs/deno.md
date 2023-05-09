# Deno

## Notes

- the Deno equivalent of `npm run` is `deno task`
- Deno is pronounces «Dee-no», not «Deh-no»
- Deno requires file endings in imports, which is not supported by the regular
  TS compiler. This makes sharing code between Deno and a UI framework
  difficult. It works, as long as the shared files don't have any imports
  themselves.

## Resources

- Official Deno manual: https://deno.land/manual@v1.25.0/introduction
- Example of a `deno.json` file for a react server:
  https://github.com/araya-playground/deno-server-react/blob/main/deno.json