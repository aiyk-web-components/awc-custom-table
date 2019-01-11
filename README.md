# Vue Data Table

### Introduction
> awc custom table is built with one primary goal in mind, REUSABILITY. the basic purpose of this project is to supply its user a holistic data table which ships with every table feature right out of the box.
Whilst ensuring that this project is complex enough to carter for every table or data management related need right out the box, we also put in concious effort to ship a product which is extremely easy to setup and or configure.

### Documentation

#### Installation
To setup this project on your local mechine;

```javascript
<!--Load Vue-->
<script src="https://unpkg.com/vue"></script>
<!--Load the web component polyfill-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.2.0/webcomponents-loader.js"></script>
<!--Load awc custom table-->
<script src="./awc-custom-table.min.js"></script>
<!--Use your custom table-->
<awc-custom-table collections="dataset"></awc-custom-table>
```


#### Setting up your data source
In other to reuse for your specific needs, all you need do is to point the table to your data source or even better, your vuex store. This can be done by passing any javascript object or json type data into the table via props.

```javascript
metaData: {
    tblTitle: "BriteCore Payment Data",
    tblSubtitle: "Customer settement sheet for the month of October, 2018.",
    trActions: true,
    trCheckbox: false,
    tblSummary: "the table is a brief breakdown of all the accumulated wealth of britecore's clientale"
}
```

```javascript
collections[
    {
      "ID": "3471DA17-401F-9633-BF81-4CADA6FD5C79",
      "Name": "Kyra Lester",
      "Description": "Curabitur dictum. Phasellus in",
      "Date": "2017-07-23T04:24:49-07:00",
      "Amount": 345.54
    },
    {
      "ID": "9F5C9912-936A-FB85-1EDB-9DA87BE7FF1E",
      "Name": "Buckminster Alvarado",
      "Description": "dui, in sodales elit erat vitae risus. Duis a mi",
      "Date": "2018-11-08T05:44:15-08:00",
      "Amount": 677.08
    },
    {
      "ID": "B743AC82-3613-13A2-2E42-E0C1F5CBF8A6",
      "Name": "Athena Smith",
      "Description": "massa lobortis ultrices. Vivamus rhoncus.",
      "Date": "2018-11-11T06:19:57-08:00",
      "Amount": 73.67
    },
    {
      "ID": "74749D4F-A43F-34E8-A687-D54924B17251",
      "Name": "Cameron Thompson",
      "Description": "dolor. Fusce mi lorem, vehicula et, rutrum eu,",
      "Date": "2019-09-30T06:56:15-07:00",
      "Amount": 807.6
    }
]
```

```javascript
<data-table
    v-bind:metaData="metaData"
    v-bind:collections="collections"
    v-bind:collections_keys="collections_keys"
></data-table>
```

Kindly note that the `collections_keys` prop is derived from the keys in your dataset

```javascript
collections_keys: state => {
    if (state.collections) {
        let obj = state.collections;
        for (var prop in obj) {
            return Object.keys(obj[prop]);
        }
    }
}
```

### Contributing

1.    Fork it!
2.    Create feature branch: `git checkout -b my-new-feature`
3.    Commit your changes: `git commit -am 'Add some feature'`
4.    Push to your branch: `git push origin my-new-feature`
5.    Submit a pull request

### License
#### MIT
================================================================================

Copyright 2019 aiyk web components


Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.