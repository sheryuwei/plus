sed -i 's/"name": "@sheryuwei\/plus",/"name": "@sheryuwei\/plus-nightly",/' packages/element-plus/package.json
sed -i '2s/element-plus/@element-plus\/nightly/' internal/build-constants/src/pkg.ts