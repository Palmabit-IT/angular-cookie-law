#Angular Cookie Law

**Angular cookie law** provides:

* a directive for a popup banner that inform users about cookies
* a directive that blocks some code or other directive until cookies are accepted
* a service to block external services (eg. YouTube, Facebook) until cookies are accepted

## Install

You can install this package with `bower` or `npm`.

#### bower

```shell
bower install angular-cookie-law --save
```

#### npm

```shell
npm install angular-cookie-law --save
```

Add a `<script>` and `<style>` to your `index.html`:

```html
<link rel="stylesheet" href="/bower_components/angular-cookie-law/dist/angular-cookie-law.min.css">

<script src="/bower_components/angular-cookie-law/dist/angular-cookie-law.min.js"></script>
```

## Usage

First you need to inject ``angular-cookie-law`` into your angular module.

```javascript
angular.module('myApp', ['angular-cookie-law']);
```

### CookieLawBanner directive

You could insert this directive at the beginning of `<body>` tag.

```html
<cookie-law-banner message="Your custon message" policy-url="http://link-to-your-policy"></cookie-law-banner>
```

This directive create a banner that inform users about cookies that contains a button to accept them.

### Options

From version 0.2.0, all banner texts are refreshed if one of these attributes change: **message**, **acceptText**, **declineText**, **policyText**, **policyURL**.

#### message

```
message: 'Your custome message'
```

The message to be shown with banner (default: "We use cookies to track usage and preferences").

#### acceptButton

```
acceptButton: true
```

Show or hide **accept button** (default: true).

#### acceptText

```
acceptText: 'Your custom text'
```

The text for **accept button** (default: "I Understand").

#### declineButton

```
declineButton: false
```

Show or hide **decline button** (default: false).

#### declineText

```
declineText: 'Your custom text'
```

The text for **decline button** (default: "Disable Cookies").

#### policyButton

```
policyButton: false
```

Show or hide **policy link button** (default: false).

#### policyText

```
policyText: 'Your custom text'
```

The text for **policy link button** (default: "Privacy Policy").

#### policyURL

```
policyURL: '/privacy-policy/'
```

The URL to show **privacy policy** (default: "/privacy-policy/").

#### policyBlank

```
policyBlank: false
```

Set **true** to open privacy policy page in other tab (default: false).

#### expireDays

```
expireDays: 365
```

Days number for the accept cookie expiration (default: 365).

#### element

```
expireDays: 'body'
```

Element to append/prepend cookieBar to. Remember `.` for class or `#` for id. (default: "body").

### CookieLawWait directive

```html
<cookie-law-wait>
    <div>...</div>
</cookie-law-wait>
```

The `divs` inside `<cookie-law-wait>` directive are loaded only after cookies are accepted.

### CookieLawService

This service provides a function to know if cookies are accepted.

First you need to inject ``CookieLawService`` into your angular controller or directive.

```javascript
angular.module('myApp').controller('MyCtrl', ['CookieLawService']);
```

#### isEnabled

This function tells you if cookies are accepted.

```javascript
CookieLawService.isEnabled(); //true or false
```

## Events

#### Accept event

The event `cookieLaw.accept` is triggered when cookies are accepted.

```javascript
$scope.$on('cookieLaw.accept', function() {
    //callback function
});
```

#### Dismiss event

The event `cookieLaw.dismiss` is triggered when cookies banner is closed.

```javascript
$scope.$on('cookieLaw.dismiss', function() {
    //callback function
});
```

#### Decline event

The event `cookieLaw.decline` is triggered when cookies are declined.

```javascript
$scope.$on('cookieLaw.decline', function() {
    //callback function
});
```

## Author

[palmabit.com](http://www.palmabit.com)

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
