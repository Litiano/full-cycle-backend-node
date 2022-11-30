#!/bin/sh

# -b, --withoutbackup   Don't create backupfile if already exists target file
# -i, --fileexcludes    pass exclude pattern of filename. default exclude
#                       directory is "[]"                                [array]
# -e, --excludes        pass exclude directory. default exclude directory is
#                       ['@types', 'typings', '__test__', '__tests__']   [array]

npm run cti create './src/@seedwork/application' -- -i '*spec.ts' -b &&
npm run cti create './src/@seedwork/domain' -- -i '*spec.ts' -b &&
npm run cti create './src/@seedwork/infra' -- -i '*spec.ts' -b &&

npm run cti create './src/category/application' -- -i '*spec.ts' -b &&
npm run cti create './src/category/domain' -- -i '*spec.ts' -b &&
npm run cti create './src/category/infra' -- -i '*spec.ts' -b
