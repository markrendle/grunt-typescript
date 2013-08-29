# grunt-typescript
Compile TypeScript with Grunt.

## Usage

```javascript
// Project configuration
grunt.initConfig({
    typescript: {
        compile: {
          files: {
            'utils.js': 'utils.ts',
            'app.js': ['app.ts', 'services.ts']
          },
          options: {
            comments: true,
            declarations: true,
            exec: true,
            module: 'amd',
            target: 'ES5'
          }
        }
    }
});
```
