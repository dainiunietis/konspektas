# sass szm style guide

## mixin'ų sufiksai, nusakantys kaip juos naudoti

`-d` — reiškia mixin'as išveda CSS deklaracijas, todėl jį naudoti galima tik ruleset'ų viduje 

```
@mixin szm-kazkas-d { 
  color: brown;
}
```

`-r` — reiškia mixin'as išveda CSS ruleset'ą, todėl jį naudoti galima tik ruleset'ų viduje ????

```
@mixin szm-kazkas-r { 
  .ogiva {
    color: brown;
  }
}
```








