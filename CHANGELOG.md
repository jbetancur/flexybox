# Release 0.4.0
* #2 flex items should now wrap properly
* #10 no gutter option (```<div class="flex-row no-gutter"></div>```)- useful for layouts where you don't want to pad your layout
* #12 switch gutters to padding instead of laborious margin calcs
* #11 you can now just set a flex item to (i.e. `<div class="flex">`) and it will auto grow - see Breaking Changes
* #13 updated documentation

## Breaking Changes
* #11 removed grow class - you can now just set a flex item to (i.e. `<div class="flex">`) and it will auto grow