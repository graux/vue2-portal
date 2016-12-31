# vue2-portal

Portal Component for Vue 2


## Install

```
npm install vue2-portal
```


## Usage

```javascript
import Portal from 'vue2-portal';

Vue.use(Portal);
```

Wrap the component that you want to transfer inside a `<portal></portal>` component

```html
<portal to="name of portal-target">
  <your-component>
    <!-- ... -->
  </your-component>
</portal>
```

Then place the `portal-target` component somewhere else and give it a name

```html
<portal-target name="destination-name">
  <!-- The contents of the portal component will appear here -->
</portal-target>
```

You can also use the `mount-to` property to mount the component on an element by it's id (without #)

```html
<portal mount-to="element-id">
  <your-component>
    
  </your-component>
</portal>

<div id="element-id">
  <!-- <your-component> will be placed here -->
</div>
```
