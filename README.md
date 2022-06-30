# sql2struct

SQL2Struct is a developer-friendly tool used for transfering sql statement to go struct.

[中文说明](README-CN.md)

## use sql2struct online

click to visit the [sql2struct online website](https://dou.tools/sql2struct/)

## use sql2struct as chrome extension

1. install from source

```shell
git clone https://github.com/idoubi/sql2struct.git
cd sql2struct
pnpm install
```

2. build chrome extension

```shell
pnpm build:chrome
```

3. install chrome extension

open [chrome://extensions/](chrome://extensions/)

load extension from sql2struct project dir `dist/chrome`

## use sql2struct locally

1. install from source

```shell
git clone https://github.com/idoubi/sql2struct.git
cd sql2struct
pnpm install
```

2. preview

```shell
pnpm dev
```

3. build

```shell
pnpm build

# or

pnpm build:web
```

## how to use

1. execute `show create table xxx\G;` in your database client.

![20220626221324](https://blogcdn.idoustudio.com/blog/20220626221324.png)

2. paste sql statement in the left editor.

![20220626222145](https://blogcdn.idoustudio.com/blog/20220626222145.png)

and you'll see the go struct code in the right editor transfered from the sql statement you pasted.

3. change the transfer options.

by default, only json tags will be used in transfered go struct code. you can click other checkboxes to add more tags. =[]

![20220626222618](https://blogcdn.idoustudio.com/blog/20220626222618.png)

and you can click "options" button to modify other transfer options.

fields in "special identifiers" will be uppercased when transfered to go struct fields.

![20220626222854](https://blogcdn.idoustudio.com/blog/20220626222854.png)

"field maps" defines the map rules between sql field type and go struct field type.

![20220626222912](https://blogcdn.idoustudio.com/blog/20220626222912.png)

## something else

stars and issues are all be appreciated.

you can contact me by email to <me@idoubi.cc>.
