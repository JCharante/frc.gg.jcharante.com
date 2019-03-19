# Quasar App

while sleep 200; do make deploy && make invalidate; done;

> WIP

## avatars

Go to https://www.thebluealliance.com/avatars/2019

Type in

```js
let data = {};
$('.avatar-link').each(function(i) {
    let avatar = $(this).find('img').attr('src');
    let name = $(this).find('img').attr('title') || $(this).find('img').attr('data-original-title');
    let number = parseInt(name.split(' ')[1]);
    data[number] = avatar;
});
copy(data)
```

now paste that into avatars.json
