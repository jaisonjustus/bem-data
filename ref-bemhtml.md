<a id="intro"> </ a> 

# # Introduction 

This document ** ** is a reference guide for template engine BEMHTML. 

The document describes: 

* Basic features BEMHTML, distinguishing it from other template engines; 
* Syntax of the input data and templates BEMJSON BEMHTML; 
* The processing order of the input data and generate HTML; 
* Examples of typical problems means BEMHTML. 

The target audience of the document ** ** - Web developers and HTML-layout using 
[BEM-methodology] (http://ru.bem.info/method/). 

It is assumed that the reader is familiar with: 

* HTML; 
* JavaScript; 
* CSS; 
* BEM. 

** The document does not describe ** setup the development environment and procedures for compiling templates. 

<a name="bemhtml"> </ a> 

# # # Features templating BEMHTML 

<a id="bem_area"> </ a> 

# # # # Bind to BEM-domain 

Templating BEMHTML is a bunch of technologies that ensure the creation of Web interfaces within 
[BEM-methodology] (http://ru.bem.info/method/). 

The input data templating is a page describing the BEM-tree format [BEMJSON] (# bemjson). 
Template language BEMHTML offers special designs for processing units, elements and modifiers. 

<a id="decl_template"> </ a> 

# # # Declarative templates 

<a id="imperativ"> </ a> 

# # # # Imperative approach 

Traditional shablonizatory offer ** ** mandatory approach to writing templates: HTML is generated in the process 
sequential read of the template. 

<table> 
<tr> 
    <th> Input </ th> 
    <th> template </ th> 
    <th> Result </ th> 
</ Tr> 
<tr> 
    <td> 
        <pre> <code> 
{ 
  items: [ 
    {Text: '1 '}, 
    {Text: '2 '} 
  ] 
} </ Code> </ pre> 
    </ Td> 

    <td> 
        <pre> <code> 
<ul class="menu"> 
    [% Foreach item in items%] 
        <li class="menu__item"> 
            [% Item.text%] 
        </ Li> 
    [% End%] 
</ Ul> 
        </ Code> </ pre> 
    </ Td> 
    <td> 
        <pre> <code> 
<ul class="menu"> 
    <li class="menu__item"> 1 </ li> 
    <li class="menu__item"> 2 </ li> 
</ Ul> 
        </ Code> </ pre> 
    </ Td> 

</ Tr> 
</ Table> 

This template is inevitable redundancies caused by the syntactic requirements of HTML: * display opening 
tag - generated content - to bring the closing tag *. Even higher redundancy in tables, lists, etc. 

<a id="declarativ"> </ a> 

# # # # # Declarative approach 

The declarative approach ** ** allows to formulate a set of templates as simple statements like: * Type of input data 
(BEM-entity) - HTML-representation (tag, attribute, etc.) *. 

<table> 
    <tr> 
        <th> Input </ th> 
        <th> template </ th> 
        <th> Result </ th> 
    </ Tr> 
    <tr> 
        <td> 
        <pre> <code> 
{ 
    block: 'menu', 
    content: [ 
        {Elem: 'item', content: '1 '}, 
        {Elem: 'item', content: '2 '} 
    ] 
} 
        </ Code> </ pre> 
        </ Td> 
        <td> 
        <pre> <code> 
block menu { 
    tag: 'ul' 
    elem item, tag: 'li' 
} 
        </ Code> </ pre> 
        </ Td> 
        <td> 
        <pre> <code> 
<ul class="menu"> 
    <li class="menu__item"> 1 </ li> 
    <li class="menu__item"> 2 </ li> 
</ Ul> 
        </ Code> </ pre> 
        </ Td> 
    </ Tr> 
</ Table> 


Declarative templates is achieved by the fact that the procedure BEMHTML generate HTML-item standardized 
templating and executed. The same approach to the transformation of data used in XSLT and AWK. 

<a id="descriptionlanguage"> </ a> 

# # # # Description Language Templates - JavaScript 

BEMHTML is a specialized language (DSL), ** extends ** JavaScript. 

More precisely, BEMHTML is a superset of the pattern language [XJST] (https://github.com/veged/xjst/), which, in turn, 
is a superset of JavaScript. 

BEMHTML syntax provides a concise way of writing correspondence BEM-entity and generate HTML-elements and attributes. 
Besides, the templates may be used any ** ** JavaScript-structure. 

<a id="execution_language"> </ a> 

# # # # Language of performance patterns - JavaScript 

Before performing BEMHTML compiled to optimized JavaScript, which takes BEMJSON and returns HTML. 

This pattern can be performed on the server side and the client side. 

<a id="restrictions"> </ a> 

# # # # Restrictions on the level agreements 

Developers BEMHTML tried to make it as flexible tool, so BEMHTML not provided 
technological limitations on the operations performed in the templates. In fact, in BEMHTML-code everything is possible, that it is possible 
in JavaScript. 

All restrictions, ensuring the correctness and effectiveness of the tasks templating are realized at the level of 
agreements to writing templates. Such agreements are provided in this document as a guideline. Developer 
can technically do not follow the conventions, but in this case it is necessary to weigh the advantages and disadvantages 
their solutions. 

<a id="basic"> </ a> 

# # # Concepts 

<a id="inputdata"> </ a> 

# # # # Input: BEMJSON 

Since BEMHTML based on JavaScript, as the format for BEM-tree with a set of selected JSON 
supplemental agreements on representation BEM-entities - BEMJSON. 

The task templating BEMHTML - convert input BEM-tree in the output HTML-document. In order to maintain flexibility 
and maintainability, at the level of a template engine should not produce complex transformations of input data. Templates should 
be as simple statements that map to each type of entity the right BEM-HTML-registration. 

Therefore the structure of the input BEM-tree should be focused on the representation ** ** (view), where the generation of 
HTML-tree does not require changes in the set and order of units and elements. Bringing BEM-wood to such a deployed 
mind should be done at the level of backend preceding the template engine. Illustration of view-oriented format 
data can serve as an example frendlentu made out in the section 
((# Privedenievxodnyxdannyxkformatuorientirovannomunapredstavlenie Conversion of data to a format oriented 
on representation)). 

At the same time, the details of the organization of HTML-pages, which are the responsibility zone coder should be determined 
only at the level of a template engine. An example of such a solution is given in Section ((# additionbem Adding BEM-entities to 
problems layout)). 

See ** Also ** 

  * [Syntax BEMJSON] (# bemjson) 

<a name="templatebemjson"> </ a> 

# # # # Template 

The unit of the program is to BEMHTML ** ** template. Template BEMHTML connects the input BEM entity (given name 
Essentially, the element name and the modifier value) of the entity and the corresponding HTML-element. 

The pattern consists of: 

Predicate *** ** - a set of conditions under which the template is applied. Typical properties predicate describes 
  input BEM-entity; 
* And ** body ** - instructions on how to generate the output HTML. 

See ** Also ** 

* [Syntax BEMHTML] (# bemhtml) 

<a name="moda"> </ a> 

# # # # Fashion 

In the process of templating consistently avoids BEM-input nodes of the tree. For each node - BEM-essence - 
executing a loop output HTML-generating element. For nested entities cycle generation HTML-elements is performed 
recursively. Thus, the output HTML-tree formed in the element-wise traversal BEM input tree. 

Generation cycle of each element sequentially passes through a series of phases, called modes **. ** Each mode is responsible 
for a specific portion of the generated HTML-element - the tag, attributes, class, etc. In each mode the procedure is called 
selection and execution of a suitable template. 

Modes can share the output element into fragments, each of which may be described as a simple data type: 
tag and class - a string attributes - knowledge, the need for BEM-classes - a logical value, etc. Through this 
possible to write declarative templates, which contains the predicate fashion and the body contains the data of the corresponding 
this fashion simple type. In this case, the complete picture HTML-element can be several templates. 

Special status is ** [fashion default] (# default) **, which is responsible for generating a HTML-element. Within this 
fashion and given a set procedure for passing other modes corresponding fragments of HTML-elements, and defined 
final assembly procedure HTML-element representations of the fragments generated in the other modes. Spelling 
template that overrides the behavior in this fashion allows you to fully control the generation of the element 
of BEMHTML, not using standard modes, allowing to generate an output element in parts. 

See ** Also ** 

* [Standard mode] (# standardemoda) 

<a name="context"> </ a> 

# # # # Context 

During bypass input BEMJSON-tree template constructs context ** ** - a data structure which operate 
templates. The context of the current element (node) of the input BEM-wood and includes: 

* Normalized information about the current BEM-entity; 
* Fragment of the input data without modification (current member BEMJSON-tree and its descendants); 
* String buffer in which to write HTML-result; 
* Utility field, the contents of the current state information (fashion, the position in the input BEM-tree, etc.); 
* Auxiliary functions. 

BEM-essence, described the current context, the context entity called **. ** 

See ** Also ** 

* [Paul context] (# context_field) 
* [Dostraivaniya BEM-entities from the context] (# extensionbem) 

<a name="bemjson"> </ a> 

# # # Syntax BEMJSON 

<a id="datatype"> </ a> 

# # # # Data Types 

Data Types in BEMJSON similar to the corresponding types in JavaScript. 

* Lines and Figures: 
 Line *** ** `` 'a' `` `" a "`; 
 Number *** 1 ** `` `` 0.1; 

   Data structure consisting of a string or number is valid BEMJSON. 

Object *** ** (associative array) '{key: value}' and other types other than an array. 

Solid *** ** - list may comprise elements of different type (strings, numbers, objects, arrays) 
  `[" A ", 1, {key: value}, [" b ", 2, ... ]] `. 

<a id="fields_bemjson"> </ a> 

# # # # Special fields BEMJSON 

To represent the data domain BEM and HTML BEMJSON objects are used, which are reserved 
Special field names. 

<a name="notionbem"> </ a> 

# # # # # BEM-representation of entities 

BEM-entity represented in BEMJSON as objects, which can contain the following fields: 

<table> 
<tr> 
    <th> Field </ th> 
    <th> Value </ th> 
    <th> Value Type </ th> 
    <th> Example </ th> 
</ Tr> 
<tr> 
    <td> <code> block </ code> </ td> 
    <td> Block Name </ td> 
    <td> string </ td> 
    <td> <code> {block: 'b-menu'} </ code> </ td> 
</ Tr> 

<tr> 
    <td> <code> elem </ code> </ td> 
    <td> Item Name </ td> 
    <td> string </ td> 
    <td> <code> {elem: 'item'} </ code> </ td> 
</ Tr> 

<tr> 
    <td> <code> mods </ code> </ td> 
    <td> modifiers block </ td> 
    <td> object that contains the names and values ​​of the modifiers as key-value pairs: 
        <code> {imya_modifikatora 'znachenie_modifikatora'} </ code> 
    </ Td> 
    <td> 
        <pre> <code> 
{ 
  block: 'b-link', 
  mods: {pseudo: 'yes', color: 'green'} 
} 
        </ Code> </ pre> 
    </ Td> 
</ Tr> 

<tr> 
    <td> <code> elemMods </ code> </ td> 
    <td> Modifiers element </ td> 
    <td> object that contains the names and values ​​of the element as a modifier key-value pairs: 
        <code> {imya_modifikatora 'znachenie_modifikatora'} </ code> 
    </ Td> 
    <td> 
        <pre> <code> 
{ 
  elem: 'item', 
  elemMods: {selected: 'yes'} 
} 
        </ Pre> </ code> 
    </ Td> 
</ Tr> 

<tr> 
    <td> <code> mix </ code> </ td> 
    <td> Laced units / elements </ td> 
    <td> array that contains objects that describe the intermixed and elements. The value can be a 
    entity that is treated as an array of one element. </ td> 
    <td> 
        <pre> <code> 
{ 
  block: 'b-link', 
  mix: [{block: 'b-serp-item', elem: 'link'}] 
} 
        </ Code> </ pre> 
    </ Td> 
</ Tr> 
</ Table> 

See ** Also ** 

* [Dostraivaniya BEM-entities from the context] (# extensionbem) 

<a name="notionhtml"> </ a> 

# # # # # An HTML 

BEMJSON provides the ability to specify certain aspects of the output HTML directly in the input. 
This opportunity should not be abused, as BEMJSON is the level of data and direct 
HTML layout should be done at the level of a template engine (BEMHTML). However, there are situations where justified 
Description HTML-representation at BEMJSON. In this case, the author templates BEMHTML must understand how 
Options HTML, given the input data, interact with HTML-representation defined at the template level. 

In BEMJSON provides the following fields for the direct management of HTML-representation: 

<table> 
<tr> 
    <th> Field </ th> 
    <th> Value </ th> 
    <th> Value Type </ th> 
    <th> Example </ th> 
</ Tr> 
<tr> 
    <td> <code> tag </ code> </ td> 
    <td> HTML-tag for this entity </ td> 
    <td> <code> String </ code> </ td> 
    <td> 
        <pre> <code> { 
  block: 'b-my-block', 
  tag: 'img' 
} </ Code> </ pre> 
    </ Td> 
</ Tr> 
<tr> 
    <td> <code> attrs </ code> </ td> 
    <td> HTML-attributes for this entity </ td> 
    <td> <code> Object </ code> </ td> 
    <td> 
        <pre> <code> { 
  block: 'b-my-block', 
  tag: 'img', 
  attrs: {src: '/ / yandex.ru / favicon.ico', alt:''} 
} </ Code> </ pre> 
    </ Td> 
</ Tr> 
<tr> 
    <td> <code> cls </ code> </ td> 
    <td> line added to the HTML-attribute <code> class </ code> (in addition to the automatically generated classes) </ td> 
    <td> <code> String </ code> </ td> 
    <td> 
        <pre> <code> { 
  block: 'b-my-block', 
  cls: 'some-blah-class' 
} </ Code> </ pre> 
    </ Td> 
</ Tr> 
<tr> 
    <td> <code> bem </ code> </ td> 
    <td> flag - to cancel the generation of BEM-class attribute in the HTML-<code> class </ code> for the entity </ td> 
    <td> <code> Boolean </ code> </ td> 
    <td> 
        <pre> <code> { 
  block: 'b-page', 
  tag: 'html', 
  bem: false 
} </ Code> </ pre> 
    </ Td> 
</ Tr> 
<tr> 
    <td> <code> js </ code> </ td> 
    Either <td> flag of a client-side JavaScript in the entity or parameters JavaScript </ td> 
    <td> <code> Boolean </ code> </ td> 
    <td> 
        <pre> <code> { 
  block: 'b-form-input', 
  mods: {autocomplete: 'yes'}, 
  js: { 
    dataprovider: {url: 'http://suggest.yandex.ru/ ...' } 
  } 
} </ Code> </ pre> 
    </ Td> 
</ Tr> 
</ Table> 

Please note that the names and the meaning of the fields BEMJSON, managing HTML-representation are the same names and the meaning of the relevant [standard mode] (# standardmoda) BEMHTML (tag, attributes, class, etc.). If any aspect of the output HTML ** and set the input data, and BEMHTML-in templates **, the higher priority have the meanings given in BEMHTML-templates. 

When generating HTML will be done one of two things: 

Combining values ​​*** ** HTML-parameters specified in the BEMJSON, co parameter values ​​given in BEMHTML-template. Combining values ​​is made only for those parameters for which it has the obvious meaning: `attrs`, `js`, `mix`. 
Replacement values ​​*** ** HTML-parameters specified in the BEMJSON, the values ​​set in the ** BEMHTML-template. ** Holds for all other values: `tag`, `cls`, `bem`, `content`. 

*** 
** NB ** Priority BEMHTML-templates to author ** ** templates to decide what HTML-parameters will take precedence in each case - set in BEMHTML or BEMJSON. The values ​​of HTML-parameters specified in the BEMJSON, available in templates with input by a movie BEMJSON-tree in the context of (field `this.ctx`). 
*** 

<a name="nesting"> </ a> 

# # # # # Nesting: content 

To represent the BEM sub-entities (BEM-tree) in a reserved field BEMJSON `content`. As the value of 
This field can be a random BEMJSON: 

* Primitive type (string, number). This value is used as the contents (text) HTML-element corresponding 
  contextual nature. 
* Object that describes the BEM-tree. The value is used to generate HTML-elements embedded in HTML-element 
  appropriate context entity. 

The nesting level tree BEM-entities, built with the help of field `content`, is not limited. 

See ** Also ** 

* [Fashion content] (# content) 

<a id="custom_fields"> </ a> 

# # # # # Custom fields 

In addition to specific fields that describe the BEM-entity and its HTML-view on the same object may be present 
any fields with arbitrary data that will be available for use in BEMHTML-templates. 

An example of an arbitrary field can serve as a field `url` in the block reference: 

`` `Js 
{ 
  block: 'b-link', 
  url: '/ / yandex.ru' 
} 
`` ` 

Example of using data from a field `url`, see: [Select the template on the condition] (# select_template). 

<a name="customjs"> </ a> 

# # # # Random JavaScript in BEMJSON 

BEMJSON is less restricted format than JSON. Arbitrary JavaScript-expressions are valid BEMJSON. 

Specificity BEMJSON as the data format is in compliance with those described in the previous sections of the agreements 
for naming fields in objects (to represent the BEM-entities and HTML-view) and the rules of investment objects. 

<a name="bemhtml"> </ a> 

# # # Syntax BEMHTML 

This section describes all the syntactic structure BEMHTML. 

<a name="template"> </ a> 

# # # # Template 

The pattern consists of two expressions - a predicate ** ** ** and ** the body, separated by a colon. Allowed any number of 
or lack of spaces before or after the colon: 

`` ` 
predicate: the body 
`` ` 

Each predicate ** ** is a list of one or more ** ** podpredikatov (conditions), separated by commas. 

`` ` 
podpredikat1, podpredikat2, podpredikat3: the body 
`` ` 

The comma represents a logical operator "AND". The predicate is true template if and only if all are true 
podpredikaty. The order entry podpredikatov does not matter * how to check podpredikatov not guaranteed *. 

Logically program BEMHTML is a peer to peer (flat) ** ** list of templates. However, if multiple 
patterns have basic podpredikaty ** **, they may be stored in a nested structure to minimize repetition 
code. 

Nesting is used to refer to the braces. The braces are placed after the general part of the predicate, 
therein lies a block of code that contains distinct parts of predicates and their corresponding body templates. Level 
podpredikatov nesting is not limited. 

`` ` 
podredikat1 { 
  podpredikat2: body 1 
  podpredikat3: body2 
} 
`` ` 

This entry is equivalent to the following: 

`` ` 
podpredikat 1 podpredikat 2 body 1 
podpredikat 1 podpredikat 3: body2 
`` ` 

---- 
** NB ** If this context is defined more than one template, then the last ** ** in the order listed 
in BEMHTML-file. 
More specific patterns to be in the text below, the more common. 
*** 

See ** Also ** 

* [Check podpredikatov in a certain order] (# check_predicate) 
   
<a name="podpredicate"> </ a> 

# # # # Podpredikaty 

The predicate template is a set of conditions that describe the time of application template. Podpredikat template 
corresponds to an elementary condition. 

In BEMHTML provides the following types of conditions: 

* Match the input BEM-tree. 
* Fashion. 
* Arbitrary condition 


# # # # # Matches with input BEM-tree 
Terms of coincidence with the input BEM-tree allow us to describe the applicability of the pattern in terms of the BEM-entities: block names 
and element names and values ​​modifiers. 

To do this, in the predicate uses the following keywords: 
<table> 
<tr> 
    <th> Keyword </ th> 
    <th> Arguments </ th> 
    <th> Value Type </ th> 
    <th> Example </ th> 
</ Tr> 
<tr> 
    <td> <code> block </ code> </ td> 
    <td> block name </ td> 
    <td> identifier <code> [a-zA-Z0-9-] + </ code> or any js-expression </ td> 
    <td> <pre> <code> block b-menu, block 'b-menu', block 'b' + '-menu' </ code> </ pre> </ td> 
</ Tr> 
<tr> 
    <td> <code> elem </ code> </ td> 
    <td> name of the item </ td> 
    <td> identifier <code> [a-zA-Z0-9-] + </ code> or any js-expression </ td> 
    <td> <pre> <code> block b-menu, elem item </ code> </ pre> </ td> 
</ Tr> 
<tr> 
    <td> <code> mod </ code> </ td> 
    <td> name and the value modifier block </ td> 
    <td> identifier <code> [a-zA-Z0-9-] + </ code> or any js-expression </ td> 
    <td> <pre> <code> block b-head-logo, mod size big </ code> </ pre> </ td> 
</ Tr> 
<tr> 
   <td> <code> elemMod </ code> </ td> 
   <td> name and value of the modifier element </ td> 
   <td> identifier <code> [a-zA-Z0-9-] + </ code> or any js-expression </ td> 
   <td> <pre> <code> block b-head-logo, elem text, elemMod size big </ code> </ pre> </ td> 
</ Tr> 
</ Table> 

Identifiers block elements, modifiers and their values ​​are written without quotes. The parser treats BEMHTML 
as an identifier for any string of Latin characters and the hyphen. Instead identifier may be 
Specified any JS-expression, which will be given to the line. 

---- 
** NB **: It is important not to confuse a predicate modifiers and modifiers block element. 

 * `Block input, mod theme black, elem hint` sets the `hint`, embedded in the block `input` s ** modifier block ** 
   `Theme` within the meaning of `black`. 
 * `Block input, elem hint, elemMod visibility visible` sets the `hint` s ** modifier element ** `visibility` 
   within the meaning of `visible` attached to the block `input`. 
 * `Block input, mod theme black, elem hint, elemMod visibility visible` sets the `hint` s ** modifier 
   element ** `visibility` within the meaning of `visible` attached to the block `input` s ** modifier block ** `theme` within the meaning of 
   `Black`. 

For modifiers blocks and elements using different keywords, to give the opportunity to combine 
in terms of predicates, while including references modifiers blocks and elements. 
*** 

<a name="moda2"> </ a> 

# # # # # Fashion 

As podpredikata can speak the name of one of the [standard mode] (# standardmoda). This means that the 
predicate will be true at the time of processing, when exposed to the appropriate fashion. 

To test the standard fashion using the keywords: 

* `Default` 
* `Tag` 
* `Bem` 
* `Mix` 
* `Cls` 
* `Js` 
* `JsAttr` 
* `Attrs` 
* `Content` 

Furthermore, any podpredikat consisting only of identifier (`[a-zA-Z0-9] + ') is interpreted as the name of 
non-standard fashion. For example, podpredikat `my-mode` equivalent podpredikatu `` this._mode === 'my-mode' ``. 

<a name="random_condition"> </ a> 

# # # # # Arbitrary condition 

Arbitrary conditions take into account the coincidence of the data does not fall under the subject area of ​​BEM. As arbitrary 
condition can be any JavaScript-expression, which can be cast to a boolean value. 

*** 
** NB ** Arbitrary conditions preferably written in <a name="xjst-canonical"> </ a> ** canonical form XJST **: 
  
`` ` 
predicate expression value === 
`` ` 

Where 
  
* `Predicate expression` - arbitrary JavaScript-term, driven to a boolean value; 
* `To` - arbitrary JavaScript-expression. 

The number of different ** ** predicate expressions in podpredikatah patterns should be minimized. 
These conditions allow the compiler to optimize XJST produce over arbitrary conditions template 
along with the optimization of standardized conditions (BEM-essence and fashion). 

*** 

<a name="body"> </ a> 

# # # # Body 

The body of the template is an expression that evaluates to is used to generate the output HTML. 
As the body of the template can be: 

* A separate JavaScript-expression: 

  `` ` 
  predicate: JS-expression 
  `` ` 

* Block JavaScript-code enclosed in curly braces: 

  `` ` 
  predicate: {JS-block} 
  `` ` 

*** 

** NB ** parser BEMHTML always interprets the brace at the beginning of a pattern as a symbol of the body block JavaScript-code 
so if necessary as a JavaScript-expression in the template body, use a hash (object) must be enclosed 
in parentheses: 

`` ` 
predicate: ({name: value}) 
`` ` 

*** 

As part of the body template, you can do the following: 

* Calculate and return a value. 
  If the current vogue expected value of a particular type, the value in the calculation of the body to nourish the template will be 
  is given to this type and used. If the pattern does not return a value, the value 
  `Undefined`. 
* Print out the data directly in the HTML-output. 
  To do this in the template body should write to the clipboard HTML-result (`this._buf.push (...)`). 
* Perform arbitrary operations. 

<a id="xjst"> </ a> 

# # # # Constructs XJST 

Since language is a language extension BEMHTML XJST, BEMHTML-in templates can be used syntactic 
XJST to modify the design of the context and an explicit call to the selection process and implementation of templates in a modified 
Examples. 

<a id="local"> </ a> 

# # # # # Local 

The design of `local` (language XJST) is used to temporarily change the context variables and also for subsequent 
operations with them. The syntax of the block of code is like `local` blocks `while` and `for` in JavaScript. 

The following options are recording unit `local`: 

* The body is in the form of js-expression: 

    `` ` 
    local (expressions) code 
    `` ` 

* The body is in the form of js-block: 

    `` ` 
    local (expressions) {code} 
    `` ` 

Here 
  
* `Expressions` - is a list of expressions, which are variable assignments; 
* `Code` - JavaScript-code, which is executed in a context where the variables correspond to the assigned unit 
  `Expressions`. 

According to the exit from the block all local variables whose values ​​are changed in the block `expressions`, acquire those values 
which are stored in them at the time of entry into the block. Return of the original values ​​is made in the reverse order 
assignment of variables in the block `expressions`. 

--- 
** NB ** If block `expressions` was named variable (object field) has not been determined at the time of entry into the block `local`, at the exit from block `local` this variable (the field) will be obtained and the `undefined`. 

--- 

See ** Also ** 

* For details on the construction of local [documentation XJST] (http://github.com/veged/xjst/blob/master/README.md # local) 

<a id="apply"> </ a> 

# # # # # Apply 

The design of `apply` is designed to explicitly invoke the procedure of choice and of the template, the predicate is true 
herein. The design allows you to call patterns in the modified context. 

Syntax: 

`` `Js 
apply (expressions) 
`` ` 

Where `expressions` - is a list of expressions that modify the context. The list may be empty. 

Each expression in the list of `expressions` may be: 

* Variable assignments. Similarly, block expressions in [design local] (# local). 
** New in bem-bl 0.3. * String or driven to her expression. Means "set the specified string as a fashion." 

    For example, the expression `apply ('content')` is equivalent to `apply (this._mode = 'content')`. 

When evaluating the expression `apply` the following steps: 

1. Performing expressions (assignments) in the block `expressions`. 
2. Call selection procedure and in the context of the template, obtained from step 1. 
3. Restore the values ​​of variables. 

The design of `apply (expressions)` is a shorthand expression `local (expressions) {apply ()}`. 

<a id="applynext"> </ a> 

# # # # # ApplyNext 

* New in bem-bl 0.3. * 

Design `applyNext` can re-start the process of application templates to the current context directly 
in the template body. The result is computed as if the pattern, in which this structure is used, no. 
The design returns the value calculated by applying templates to the current context. 

Syntax: 

`` `Js 
applyNext (expressions) 
`` ` 

Where `expressions` - list of expressions that modify the context (variable assignments or string 
meaning assignment modes). The list may be empty. Similarly, the unit `expressions` in [construction apply] (# apply). 

When you call `applyNext` the following steps: 

  1. The creation in the context of the flag that allows to avoid infinite recursion when calling patterns. As Flag 
     using a random number. 
  2. Adding a template predicate checks for the flag. 
  3. Execution of the block `expressions` (modification of the current context). 
  4. Calling the procedure of choice and of the template `apply ()`. 
  5. Return value obtained by performing the template. 

For example, a pattern 

`` `Js 
block b1: { 
    statements 
    applyNext () 
} 
`` ` 

equivalent to the following pattern: 

`` `Js 
var _randomflag = ~ ~ (Math.random () * 1e9) 
block b1,! this.ctx [_randomflag]: { 
    statements 
    local (this.ctx [_randomflag] = true) apply () 
} 
`` ` 

Where `statements` - JS-arbitrary expressions that are valid in the template body.

See ** Also ** 

* [Inheritance] (# inheritage) 
* [Feature BEM-entities for layout tasks] (# additionbem) 


<a id="applyctx"> </ a> 

# # # # # ApplyCtx 

Design `applyCtx` is intended to modify the input fragment BEM-tree `this.ctx` and then calling 
procedures for the use of templates `apply ()` to the context of the modified BEM-tree. 

Syntax: 

`` `Js 
applyCtx (newctx) 
`` ` 

Where as `newctx` may be: 

* Object (hash), which will be used as input BEM fragment tree. May contain references to the original 
  `This.ctx`. 
* The assignment of the variable. 

In the course of evaluating the expression `applyCtx` the following steps: 

  1. The creation in the context of the flag that allows to avoid infinite recursion when calling patterns. As Flag 
     using a random number. 
  2. Adding a template predicate checks for the flag. 
  3. Fielding [empty fashion] (# pustajamodaquotquot) as the current one. 
  4. Calling the procedure of choice and of the template `apply ()`. 
  5. Return value obtained by performing the template. 

The expression `applyCtx (newctx)` is shorthand for the expression `applyNext (this.ctx = {newctx},'')`. 

See ** Also ** 

  * [Wrapping up a block to another block] (# wrappingunit) 
  * [Feature BEM-entities for layout tasks] (# additionbem) 

<a name="standardmoda"> </ a> 

# # # The standard fashion 

At the core of BEMHTML defined set of standard events that set the tab order of the input BEM-tree (BEMJSON) and generation 
output HTML, BEMHTML used by default. 

As the functionality of fashion are divided into two classes: 

  *** The "empty" mode ** traversal algorithm determines the input BEMHTML and call other modes; 
  * All other modes determine how the generation of the output HTML. In each of these modes is generated or that 
    fragment of the output HTML-tree. 

To generate the HTML in each mode is called the procedure of choice and implementation of a suitable template (a predicate which is true 
herein). The result of evaluating the body selected template is substituted in one piece of HTML-tree 
(HTML-element), which is responsible for the generation of this fashion. 

This logic imposes the following restrictions on the templates: 

  * If the pattern displays some data in HTML, in its predicate must be specified fashion. 
  * In the predicate of the template can be set not more than one mode. 
  * The evaluation template body must return the type of the object, which is expected within a given mode. 

In the following sections, fashion listed in order of call when processing the input element BEMJSON. 

<a name="empty_moda"> </ a> 

# # # # "Empty" mode (`" "`) 

* The type of the value of the body template, 'Do not use' * 

Empty (not defined) mode corresponds to the time when the value of the field of context `this._mode` is an empty stock 
(`" "`). This value is set: 

  * Before processing the input tree; 
  * At the time of the recursive procedure call traversal in vogue `default`. 

The action performed in the empty fashion, depends on the context (current) element of the input BEMJSON-tree. 

<table> 
<tr> 
    <th> Item Type </ th> 
    <th> Action </ th> 
</ Tr> 
<tr> 
    <td> <b> BEM-entity </ b> (unit or item) </ td> 
    <td> Putting the values ​​of fields in the service context (<code> block elem mods elemMods ctx position </ code>) 
    and call patterns in the fashion <code> default </ code>. </ td> 
</ Tr> 

<tr> 
    <th> line / number </ th> 
    <td> output value given to the line buffer HTML-result. </ td> 
</ Tr> 
<tr> 
    <th> Boolean, undefined, null </ th> 
    <td> blank line in the output buffer HTML-result. </ td> 
</ Tr> 
<tr> 
    <th> array </ th> 
    <td> Iterate through the array with a recursive call to a blank template for fashion. </ td> 
</ Tr> 
</ Table> 

Defining a template for a blank mode (podpredikat `this._mode ===" "`) makes sense only if necessary 
override the principle of bypassing the input tree. 
  
Calling patterns on a blank mode (design `apply ('')` in the template body) is necessary if you want to deviate 
to-one correspondence "input BEM-entity - the output HTML-element" and generate more than one element 
One input entity. In particular, such a call is performed automatically using 
[Construction applyCtx] (# applyctx). 

See ** Also ** 

  * [Wrapping up a block to another block] (# wrappingunit) 

<a id="default"> </ a> 

# # # # Default 

* The type of the value of the body template, 'Do not use' * 

As part of fashion `default` fully formed HTML-output element corresponding to the input BEM-being. 

In the course of fashion `default` is: 
  
  * Call all the other standard modes are responsible for the formation of certain aspects of HTML-element; 
  * Combines the results of all of the events caused in the resulting HTML-line; 
  * Recursive call patterns on the result of the fashion `content`. 

The figure below schematically reflected in what modes are generated by various pieces of HTML-output element. 
  


The figure demonstrates a treatment option element having a pair of opening and closing tag-attached content. Processing 
short (samozakrytyh) elements similar and differ only in the absence of an end tag, and recursion. It should be 
whether treating this element as a short, context determines the utility function `this._.isShortTag` 
based on the element name (tag). 

Template definition in the fashion of `default` (podpredikat `default`) is needed in cases when you need to override 
procedure for the generation of HTML-output element, for example, to add a DOCTYPE tag to the HTML: 

`` `Js 
block b-page { 
  default: { 
    this._buf.push ('<! DOCTYPE html>'); 
    applyNext (); 
  } 
  tag: 'html' 
} 
`` ` 

<a id="tag"> </ a> 

# # # # Tag 

** Value type template body: `String` * 
** Default: `` 'div' `` * 

Fashion `tag` specifies the output HTML-element (tag). By default, the element name is `div`. Fragments of HTML, for the generation of 
which is responsible fashion `tag`, highlighted below: 

! [Mode-tag] (https://raw.github.com/bem/bemhtml/master/common.docs/reference/reference_mode_tag.png)

*** 
** NB ** If the value is `tag` specify an empty string for this entity will be skipped a generation step 
HTML-element (tag and all attributes), but the content of the element (`content`) will be processed as usual. 
*** 

Defining a template for fashion `tag` (podpredikat `tag`) is necessary if: 

  * For a given entity should generate a HTML-element with a name other than `div`; 
  * Refuse to generate HTML-element for a given entity, but the handle nested entities. 

<table> 
<tr> 
    <th> Input </ th> 
    <th> template </ th> 
    <th> HTML-result </ th> 
</ Tr> 

<tr> 
    <td> 
        <pre> <code> { 
  block: 'b1', 
  content: 'text' 
} </ Code> </ pre> 
    </ Td> 
    <td> <pre> <code> block b1, tag: 'span' </ code> </ pre> </ td> 
    <td> <pre> <code> <span class="b1"> text </ span> </ code> </ pre> </ td> 
</ Tr> 
<tr> 
    <td> 
        <pre> <code> { 
  block: 'b1', 
  content: { 
    block: 'b2' 
  } 
} </ Code> </ pre> 
    </ Td> 
    <td> <pre> <code> b1, tag:'' </ code> </ pre> </ td> 
    <td> <pre> <code> <div class="b2"> </ div> </ code> </ pre> </ td> 
</ Tr> 
</ Table> 

<a id="js"> </ a> 

# # # # Js 

** Value type template body: `Boolean | Object` * 
** The default value: `false` * 

Fashion `js` indicates whether the block being processed client JavaScript. In the case of JavaScript in vogue `js` 
can be passed parameters client JavaScript (written in HTML-attribute element whose name is derived 
[Fashion `jsAttr`] (# jsattr). 

Fashion `js` allows two types of values ​​template body: 

  * `Boolean` - A flag indicating whether the block is a client JavaScript. 
  * `Object` - A hash containing the parameters JavaScript (assumes that the unit has a client JavaScript). 
   
Fragments of HTML, which is responsible for the generation of fashion `js`, highlighted below: 

! [Mode-js] (https://raw.github.com/bem/bemhtml/master/common.docs/reference/reference_mode_js.png)

Defining a template for fashion `js` (podpredikat `js`) makes sense only if the unit has a client 
JavaScript. 

<table> 
<tr> 
    <th> Input </ th> 
    <th> template </ th> 
    <th> HTML-result </ th> 
</ Tr> 
<tr> 
    <td> <pre> <code> {block: 'b1'} </ code> </ pre> </ td> 
    <td> <pre> <code> block b1, js: true </ code> </ pre> </ td> 
    <td> <pre> <code> <div class="b1 i-bem" onclick="return {'b1': {} }"> </ div> </ code> </ pre> </ td> 
</ Tr> 
<tr> 
    <td> <pre> <code> {block: 'b1'} </ code> </ pre> </ td> 
    <td> <pre> <code> block b1, js: {param: 'value'} </ code> </ pre> </ td> 
    <td> <pre> <code> <div class="b1 i-bem" onclick="return {'b1': {'param':'value'} }"> </ div> </ code > </ pre> </ td> 
</ Tr> 
</ Table> 

See ** Also ** 

  * [JS-block implementation of i-bem] (http://bem.github.com/bem-bl/sets/common-desktop/i-bem/i-bem.ru.html) 

<a id="bem"> </ a> 

# # # # Bem 

** Value type template body: `Boolean` * 
** The default value: `true` * 

Fashion `bem` specifies whether the formation of HTML-attribute `class` include automatically generated names 
classes that describe the BEM-being. By default, the generation of BEM-class runs. A fragment of HTML, for the generation of 
which is responsible fashion `bem`, highlighted below: 

! [Mode-bem] (https://raw.github.com/bem/bemhtml/master/common.docs/reference/reference_mode_bem.png)

Defining a template for fashion `bem` (podpredikat `bem`) makes sense only in the case if, for a given entity 
** Not ** need to generate HTML-classes related to the BEM-domain. It may be necessary to comply 
syntactic requirements of HTML. For example, the tag `html`, `meta`, `link`, `script`, `style` attribute can not have `class`. 

<table> 
<tr> 
    <th> Input </ th> 
    <th> template </ th> 
    <th> HTML-result </ th> 
</ Tr> 
<tr> 
    <td> 
        <pre> <code> { 
  block: 'b-page' 
} </ Code> </ pre> 
    </ Td> 
    <td> 
        <pre> <code> block b-page { 
  tag: 'html' 
  bem: false 
} </ Code> </ pre> 
    </ Td> 
    <td> <pre> <code> <html> </ html> </ code> </ pre> </ td> 
</ Tr> 
</ Table> 

<a id="cls"> </ a> 

# # # # Cls 

** Value type template body: `String` * 
** The default value is `''` * 

Fashion `cls` allows you to define an arbitrary string that is added to the value of the attribute `class` in addition to automatically 
values ​​generated. A fragment of HTML, which is responsible for the generation of fashion `cls`, highlighted below: 

! [Mode-cls] (https://raw.github.com/bem/bemhtml/master/common.docs/reference/reference_mode_cls.png)

Template definition in the fashion of `cls` (podpredikat `cls`) makes sense in the case for the item needed 
HTML-specific classes that do not belong to the domain BEM. 

<table> 
<tr> 
    <th> Input </ th> 
    <th> template </ th> 
    <th> HTML-result </ th> 
</ Tr> 
<tr> 
    <td> 
        <pre> <code> { 
  block: 'b1' 
} </ Code> </ pre> 
    </ Td> 
    <td> <pre> <code> block b1, cls: 'custom' </ code> </ pre> </ td> 
    <td> <pre> <code> <div class="b1 custom"> </ div> </ code> </ pre> </ td> 
</ Tr> 
</ Table> 

<a id="mix"> </ a> 

# # # # Mix 

** Value type template body: `Array | Object` * 
** The default value is `[]` * 

Fashion `mix` BEM-list specifies the entities that need to be admixed ** ** to the entity. Entity, in which 
admixture is performed is called the base **, ** and add entities - the compounding **. ** It makes sense to adulteration 
blocks and elements. 

Technically, the admixture is reduced to the following operations: 
  * BEM classes are added to the compounding nature value `class` attribute of the current element, along with the classes 
    base entity. 
  * If the compounding nature of a JavaScript-parameters, they are added to the value of the attribute specified by the fashion 
    `JsAttr`. JavaScript-parameters are passed as a hash key is the name of the compounding nature. 

All other components of the HTML-element (tag, attributes and under.) Are generated based on templates for the base entity. 

The value of the body of a template for a given mode can be: 

  Array ***, ** which contains a list of objects (hashes), each of which describes the BEM-entities that 
    to mix with. 
  Object *** ** describing the compounding BEM-being. Is interpreted as an array of one element. 

A fragment of HTML, which is responsible for the generation of fashion `mix`, highlighted below: 

! [Mode-mix] (https://raw.github.com/bem/bemhtml/master/common.docs/reference/reference_mode_mix.png)

Defining a template for fashion `mix` (podpredikat `mix`) is required when making an admixture unit 
or item-level template engine. 

*** 
Mixing ** NB ** BEM-entities is performed recursively. In other words, if the compounding nature defined 
pattern where it has mixed with any entity, all these entities are added recursively and classes 
for them to appear in `class` attribute of the base entity (see example below). 
*** 

<table> 
<tr> 
    <th> Input </ th> 
    <th> template </ th> 
    <th> HTML-result </ th> 
</ Tr> 
<tr> 
    <td> 
        <pre> <code> { 
  block: 'b1' 
  js: {p: 1} 
} </ Code> </ pre> 
    </ Td> 
    <td> 
        <pre> <code> block b1, mix: ({ 
  block: 'b2', 
  js: {p: 2} 
}) </ Code> </ pre> 
    </ Td> 
    <td> <pre> <code> <div class = "b1 b2 i-bem" onclick = "return {'b1': {'p': 1}, 'b2': {'p': 2}} "> </ div> </ code> </ pre> </ td> 
</ Tr> 
<tr> 
    <td> 
        <pre> <code> { 
  block: 'b1' 
} </ Code> </ pre> 
    </ Td> 
    <td> 
        <pre> <code> block b1, mix: [{block: 'b2'}] 
block b2, mix: [{block: 'b3'}] 
block b3, mix: [{block: 'b4'}] 
block b4, mix: [{block: 'b1'}] </ code> </ pre> 
    </ Td> 
    <td> <pre> <code> <div class="b1 b2 b3 b4"> </ div> </ code> </ pre> </ td> 
</ Tr> 
</ Table> 

<a id="jsAttr"> </ a> 

# # # # JsAttr 

** Value type template body: `String` * 
** Default: `'onclick'` * 

Fashion `jsAttr` specifies the name of the HTML-attribute in the value of which will be given options for client-side JavaScript 
current block. The default attribute `onclick`. A fragment of HTML, which is responsible for the generation of fashion `jsAttr`, 
highlighted below: 



Defining a template for fashion `jsAttr` (podpredikat `jsAttr`), necessary in the event that you want to transfer 
JavaScript parameters in non-standard attribute. For example, a touch-sites for this purpose using the attribute `ondblclick`. 

<table> 
<tr> 
    <th> Input </ th> 
    <th> template </ th> 
    <th> HTML-result </ th> 
</ Tr> 
<tr> 
    <td> 
        <pre> <code> { 
  block: 'b1', 
  js: true 
} </ Code> </ pre> 
    </ Td> 
    <td> <pre> <code> block b1, jsAttr: 'ondblclick' </ code> </ pre> </ td> 
    <td> <pre> <code> <div class="b1 i-bem" ondblclick="return {'b1': {} }"> </ div> </ code> </ pre> </ td> 
</ Tr> 
</ Table> 

<a id="attrs"> </ a> 

# # # # Attrs 

** Value type template body: `Object` * 
** The default value is `{}` * 

Fashion `attrs` allows you to specify the names and values ​​of arbitrary HTML-attributes for this element. By default 
Additional attributes are generated. A fragment of HTML, which is responsible for the generation of fashion `attrs`, highlighted below: 



The value of the body of a template for a given mode must be an object (hash) that contains the names and values ​​of attributes as 
key-value pairs. As a key should act valid HTML-id attribute, and the value - a string or a number. When outputting HTML special characters in attribute values ​​are escaped auxiliary function `this._.attrEscape ()`. 

*** 
** NB ** If the value attribute to specify `undefined`, this attribute will not be displayed in the HTML-element. 
*** 

Defining a template for fashion `attrs` (podpredikat `attrs`) is necessary in all cases that require: 

  * Add arbitrary HTML-level attributes templating; 
  * Exclude specified attributes from the output, even if they were defined in the input BEMJSON. 

<table> 
<tr> 
    <th> Input </ th> 
    <th> template </ th> 
    <th> HTML-result </ th> 
</ Tr> 

<tr> 
    <td> 
        <pre> <code> { 
  block: 'logo', 
} </ Code> </ pre> 
    </ Td> 
    <td> 
        <pre> <code> block logo { 
  tag: 'img' 
  attrs: ({alt: 'logo', href: 'http:// ...'}) 
} </ Code> </ pre> 
    </ Td> 
    <td> <pre> <code> <img alt = "logo" href = "http:// ..." /> </ Code> </ pre> </ td> 
</ Tr> 

<tr> 
    <td> 
        <pre> <code> { 
  block: 'input', 
  disabled: true 
} </ Code> </ pre> 
    </ Td> 
    <td> 
        <pre> <code> block input { 
  tag: 'input' 
  attrs: ({disabled: this.ctx.disabled? 'disabled': undefined}) 
} </ Code> </ pre> 
    </ Td> 
    <td> <pre> <code> <input class="input" disabled="disabled"/> </ code> </ pre> </ td> 
</ Tr> 

<tr> 
    <td> 
        <code> {block: 'input'} </ code> 
    </ Td> 

    <td> The same pattern </ td> 
    <td> <pre> <code> <input class="input"/> </ code> </ pre> </ td> 
</ Tr> 
</ Table> 

<a name="content"> </ a> 

# # # # Content 

** Value type template body: `BEMJSON` * 
** Default: `this.ctx.content` * 

As part of fashion `content` calculated contents of HTML-element, which can be a random BEMJSON 
(As a string or a number, and the tree BEM-entities). As the value of the default value of the field 
`Content` contextual BEM-entity (`this.ctx.content`). 

A fragment of HTML, which is responsible for the generation of fashion `content`, highlighted below: 



Template definition in the fashion of `content` (podpredikat `content`) is necessary if: 

  * It is necessary to add content to the level of a template engine for the entity that lacks `content` in the input 
    BEMJSON. 
  * It is necessary to replace the contents of an entity at the level of a template engine. 

<table> 
<tr> 
    <th> Input </ th> 
    <th> template </ th> 
    <th> HTML-result </ th> 
</ Tr> 

<tr> 
    <td> 
        <pre> <code> { 
  block: 'b1' 
} </ Code> </ pre> 
    </ Td> 
    <td> 
        <pre> <code> block b1, content: ({ 
  block: 'b2' 
}) </ Code> </ pre> 
    </ Td> 
    <td> <pre> <code> <div class="b1"> <div class="b2"> </ div> </ div> </ code> </ pre> </ td > 
</ Tr> 
</ Table> 


See ** Also ** 

* [Inheritance] (# inheritage) 
* [Feature BEM-entities for layout tasks] (# additionbem) 

<a name="context_field"> </ a> 

# # Context Fields 

In the process of templating BEMHTML builds a data structure that contains information about the processing node BEMJSON 
and the processing condition. In addition, in the context of the available number of auxiliary functions BEMHTML. 

At the time of the template context is available in the form of the object, defined by the keyword `this`. Treatment 
the context as possible in the predicate and the body of the template. 

Author template has the ability to define any additional fields in context. 

All context fields may be divided into two categories: 

  Context-dependent *** ** whose value varies depending on the processing unit and the processing phases. 
  Context-independent ***, ** the value of which is constant. 

See ** Also ** 

  * [Context] (# context) 

<a name="contextdependent"> </ a> 

# # # # Context-dependent fields 

<table> 
<tr> 
    <th> Field </ th> 
    <th> Value Type </ th> 
    <th> Description </ th> 
</ Tr> 
<tr> 
    <td> <code> this.block </ code> </ td> 
    <td> <code> String </ code> </ td> 
    <td> Block name (BEM context-entity). </ td> 
</ Tr> 
<tr> 
    <td> <code> this.elem </ code> </ td> 
    <td> <code> String </ code> </ td> 
    <td> name of the element (BEM context-entity). </ td> 
</ Tr> 
<tr> 
    <td> <code> this.mods </ code> </ td> 
    <td> <code> Object </ code> </ td> 
    <td> Modifiers unit (BEM-contextual nature), <code> imya_modifikatora: znachenie_modifikatora </ code>. </ td> 
</ Tr> 
<tr> 
    <td> <code> this.elemMods </ code> </ td> 
    <td> <code> Object </ code> </ td> 
    <td> Modifiers element (BEM-contextual nature), <code> imya_modifikatora: znachenie_modifikatora </ code>. </ td> 
</ Tr> 
<tr> 
    <td> <code> this.ctx </ code> </ td> 
    <td> <code> BEMJSON </ code> </ td> 
    <td> fragment input BEMJSON-tree, which contains the processed node and its descendants unchanged. 
    Used to gain access to arbitrary fields of data input BEMJSON. </ Td> 
</ Tr> 
<tr> 
    <td> <code> this.position </ code> </ td> 
    <td> <code> Number </ code> </ td> 
    <td> position number of the current entity among its siblings in the input BEMJSON-tree (starting with 1). </ td> 
</ Tr> 

<tr> 
    <td> <code> this._mode </ code> </ td> 
    <td> <code> String </ code> </ td> 
    <td> current fashion. If you want to define your own (non-standard) mode, in the corresponding template should be 
    assign to this field the name of fashion at the time of entry into it. </ Td> 
</ Tr> 
<tr> 
    <td> <code> this._buf </ code> </ td> 
    <td> <code> Array </ code> </ td> 
    <td> Buffer HTML-result. Normally used only for recording ready HTML-fragments using the 
    <code> this._buf.push () </ code>. </ td> 
</ Tr> 
<tr> 
    <td> <code> this.isFirst () </ code> </ td> 
    <td> <code> Boolean </ code> </ td> 
    <td> Checks whether a given entity BEM-first among the siblings in the input BEM-tree .. </ td> 
</ Tr> 

<tr> 
    <td> <code> this.isLast () </ code> </ td> 
    <td> <code> Boolean </ code> </ td> 
    <td> Checks whether a given entity BEM-last among siblings in the input BEM-tree. Read more 
    See <a href="#algorithmbem"> algorithm for calculating the position of BEM-fact </ a>. </ td> 
</ Tr> 

<tr> 
    <td> <code> this.generateId () </ code> </ td> 
    <td> <code> Number </ code> </ td> 
    <td> Gets the unique identifier for the current context. Used when you need to generate 
    HTML-elements associated with the attribute <code> id </ code>. </ Td> 
</ Tr> 
</ Table> 

*** 
** NB ** 
Keywords for checking BEM-entities in the predicate are shorthand for checking the values ​​of the fields 
`Block`, `elem`, etc. in the current context. For example, podpredikat `block b1` equivalent podpredikatu 
`This.block === 'b1'`. 

Similarly, the key words for the test mode in the predicate are shorthand for checking the value of 
service field `_mode` in the current context. For example, podpredikat `tag` equivalent podpredikatu 
`This._mode === 'tag'`. 
*** 

<a name="extensionbem"> </ a> 

# # # # # Dostraivaniya BEM-entities from the context 

In BEMJSON usually written BEM-essentially minimized. For example, if the block is nested `menu` element `item`, 
in the object that describes the menu item, not the name of the containing block of the menu: 

`` `Js 
{ 
  block: 'menu', 
  content: { 
    elem: 'item' 
  } 
} 
`` ` 

Information about the element `item` belongs to the block `menu`, being completed by the context (based on the nesting) 
in the process of templating. At a time when the context is the essence of the unit `menu`, in the context of the fields will be 
exhibited the following values: 

`` `Js 
this.block: 'menu' 
this.ctx.block: 'menu' 
`` ` 

At the time of entry into the sub-element of `item`, in the `this.block` being completed value `menu`. At the same time, the field 
`This.ctx.block` value is `undefined`, since the input BEMJSON this field in a `item` is not defined: 

`` `Js 
this.block: 'menu' 
this.elem: 'item' 
this.ctx.block: undefined 
this.ctx.elem: 'item' 
`` ` 

Dostraivaniya also holds for the elements admixed in blocks. Example, in the BEM-tree: 

`` `Js 
{Block: 'b1', mix: {elem: 'e1'}} 
`` ` 

In mixed into the element name of the block will be completed: 

`` `Js 
{Block: 'b1', mix: {block: 'b1', elem: 'e1'}} 
`` ` 

Dostraivaniya BEM-entities is necessary for correct operation of predicates on the elements of blocks of the form 
`Block menu, elem item`, as in such predicates are checked values ​​of the fields of context `this.block` and `this.elem`. 

*** 
** NB ** In order to avoid that the predicate of the form `block menu` nested within a block of elements at compile time 
Templates for such predicates where necessary automatically added podpredikat `! this.elem`. Automatic 
adding it may not work if the predicate template contains podpredikat with any condition, the recorded 
not in [the canonical form XJST] (# xjst-canonical). 
*** 

<a name="algorithmbem"> </ a> 

# # # # # Algorithm for calculating the position of BEM-entity 

Position in the BEM-tree (context field `this.position`) is a natural number that indicates the sequence 
number of the current (PPC) BEM-entity among its siblings in the BEM-tree (peer entities). 

In the calculation of the position: 

  * Only those nodes are numbered processed BEMJSON, which correspond to BEM-entities, other units 
    do not correspond to any item number. 
  * Items are numbered starting with 1. 
  * Numbering made in the order tree traversal (flattened list layering BEMJSON). 

An example of the numbering in the input BEM-tree: 

`` `Js 
{ 
  block: 'page', / / ​​this.position === 1 
  content: [ 
    {Block: 'head'}, / / ​​this.position === 1 
    {Block: 'menu', / / ​​this.position === 2 
      content: [ 
        {Elem: 'item'}, / / ​​this.position === 1 
        {Elem: 'item'}, / / ​​this.position === 2 
        {Elem: 'item'} / / this.position === 3 
      ] 
    } 
    'Text' / / this.position === undefined 
  ] 
} 
`` ` 

*** 
** NB ** BEM-tree can be completed in the course of the template using the template in the fashion of `content` and templates 
the empty fashion. This dynamic change BEM-tree is taken into account in the calculation of the position. 
*** 

Function determine the last BEM-entity among siblings `this.isLast ()` ** does not work ** in the event that 
in the array having a peer-BEM essence, the last element is not a BEM-entity. For example: 

`` `Js 
{ 
  block: 'b1', 
  content: [ 
    {Block: 'b2'}, 
    {Block: 'b3'}, / / ​​this.isLast () === false 
    'Text' 
  ] 
} 
`` ` 

This behavior is explained by the fact that in order to optimize BEMHTML not perform preliminary round-trip 
BEM-tree. Therefore, at the time of processing unit `b3` already known length of the array (`b3` is not the last element) 
but it is not known that the last item is not a BEM-entity and does not receive the item number. 

In practice, the described case of incorrect operation `this.isLast ()` should not generate errors, since checking 
the first / last BEM-essence is usually applied to an automatically generated list of entities to which 
does not make sense to include other types of data. 

<a name="context_independent"> </ a> 

# # # # Context-independent fields 

All context-independent fields are grouped in the object `this._` and are auxiliary functions 
used at work templating. Author templates can also use these functions in the body templates 
and a predicate. 

<table> 
<tr> 
    <th> Field </ th> 
    <th> Value Type </ th> 
    <th> Description </ th> 
</ Tr> 
<tr> 
    <td> <code> this._.isArray (Object) </ code> </ td> 
    <td> <code> Boolean </ code> </ td> 
    <td> Checks if the given object array. </ td> 
</ Tr> 
<tr> 
    <td> <code> this._.isSimple (Object) </ code> </ td> 
    <td> <code> Boolean </ code> </ td> 
    <td> Checks whether a given primitive JavaScript object type. </ td> 
</ Tr> 
<tr> 
    <td> <code> this._.isShortTag (String) </ code> </ td> 
    <td> <code> Boolean </ code> </ td> 
    <td> checks to see if the specified tag name to the list of short tags (which do not require the closure member 
    and recursion). Full list kotorkih tags: <code> area, base, br, col, command, embed, hr, img, input, 
    keygen, link, meta, param, source, wbr </ code>. </ td> 
</ Tr> 
<tr> 
    <td> <code> this._.extend (Object, Object) </ code> </ td> 
    <td> <code> Object </ code> </ td> 
    <td> Returns a hash that combines the contents of two hashes that are passed as arguments. If the hashes contain 
    matching keys, the result is stored in the value of the hash passed as the second argument. </ td> 
</ Tr> 
<tr> 
    <td> <code> this._.xmlEscape (String) </ code> </ td> 
    <td> <code> String </ code> </ td> 
    <td> Returns the string passed to shield the control characters XML <code> [& <>] </ code>. </ td> 
</ Tr> 
<tr> 
    <td> <code> this._.attrEscape (String) </ code> </ td> 
    <td> <code> String </ code> </ td> 
    <td> Escapes value of control characters for values ​​of XML-and HTML-attributes (<code> "[& <>] </ code>). </ td> 
</ Tr> 
</ Table> 

<a name="examples"> </ a> 

# # # Samples and recipes 

<a name="bringing_input"> </ a> 

# # # # Bringing the input data to a format oriented representation 

# # # # # Problem 

Generate input BEM-tree for the page picture of friends (a list of posts with information about the author), convenient 
treatment in terms of patterns BEMHTML. This tree should be focused on the idea that set 
and the procedure for BEM-entities must comply with the order and set DOM-node output HTML. 

# # # # # Solution 

Bringing to the format, presentation-oriented, should be carried out BEMHTML, at the level of data preparation 
in the backend. This backend usually works with normalized data (data-oriented format). In the case of frendlentu 
Original data can be: 

`` `Js 
{ 
    posts: [{text: 'post text', author: 'login'}, ...], 
    users: {'login': {userpic: 'URL', name: 'Full Name'}, ...}, 
} 
`` ` 

Data are presented as two lists of objects of different types. The list of posts is only identifier 
user, and complete information about the user is in the appropriate hash in the user list. 

The data format that focuses on the representation involves denormalizing data, ie the deployment of the list of posts 
so that in each post contain full information about the author, even if you have multiple 
positions of one author. In BEMJSON this format might look like this: 

`` `Js 
{ 
    block: 'posts', 
    content: [ 
        { 
            block: 'post', 
            content: [ 
                {Block: 'userpic', content: 'URL'}, 
                {Block: 'user', content: 'Full Name'}, 
                {Elem: 'text', content: 'post text'} 
            ] 
        } 
        ... 
    ] 
} 
`` ` 

<a name="select_template"> </ a> 

# # # # Select a template for the condition 

# # # # # Problem 

Block `b-link` occurs in two varieties: 
  
  * `{Block: 'b-link', content: 'no link URL'}` 
  * `{Block: 'b-link', url: '/ / ya.ru', content: 'link to the URL'}` 

Should be differently adjusted output HTML-element, depending on the presence / absence of a field `url` in the data block. 

# # # # # Solution 
It is necessary to check for the presence of the field `url` podpredikatom template: the expression `this.ctx.url` is true only 
if the field is `url` is defined. 

`` `Js 
block b-link { 
  tag: 'span' 
  this.ctx.url { 
    tag: 'a' 
    attrs: {href: this.ctx.url} 
  } 
} 
`` ` 

Wrong ** ** use to solve this problem conditionals JavaScript in the template body: 

`` `Js 
block b-link, tag: this.ctx.url? 'A': 'span' 
`` ` 

When compiling this expression will not be optimized, which will adversely affect the speed of the template. 

See ** Also ** 

  * [Pattern Syntax] (# template) 

<a name="inheritage"> </ a> 

# # # # Inheritance 

# # # # # Problem 

At different [levels 
identified two different template on the same BEM-entity (`block b1`). Each template defines its 
the contents of the fashion `content`. 

Should be on the second level override ** ** inherit content defined at the first level, and add 
additional. Requires analog `<xsl:apply-imports/>`. 

# # # # # Solution 
In BEMHTML is an analogue of `<xsl:apply-imports/>`. The implementation is based on the ability to re-run the template 
procedure for applying patterns to the current context (`apply ()`). Thus, you can call that a pattern that was 
defined for a given context (BEM-entity fashion, etc.) before or at another level overrides. 

When evaluating the expression `apply ()` returns the result obtained from the use of the previously defined template. 
To avoid an infinite loop to add podpredikat check in the context of a certain flag (e.g., 
`_myGuard`), Which will be exposed when the `apply ()`. 

`` `Js 
/ / Pattern on the first level override 
block b1, content: 'text1' 

/ / Pattern on the second level override 
block b1, content,! this._myGuard: [ 
    apply (this._myGuard = true), / / ​​get the previous value of content 
    'Text2' 
] 
`` ` 

As a result of the use of templates to block `b1` is received HTML: 

`` `Html 
<div class="b1"> text1text2 </ div> 
`` ` 

* In bem-bl version 0.3 * added design `applyNext`, which automatically generates a unique name for the flag against 
cycling. 

`` `Js 
block b1, content: 'text1' 

block b1, content: [ 
    applyNext (), / / ​​get the previous value of content 
    'Text2' 
] 
`` ` 

See ** Also ** 

  * [Design applyNext] (# applynext) 


<a name="wrappingunit"> </ a> 

# # # # Wrapping up a block to another block 

# # # # # Problem 

Need to invest a unit (`b-inner`) in the other block (`b-wrapper`) when the template. Thus, one input 
unit will fit two nested block. 

# # # # # Solution 

When processing unit `b-inner` in the template for fashion `default` (generation of a cell) should be modified fragment 
input tree `this.ctx`, and added to the block `b-wrapper` and run recursively calling patterns in an empty fashion 
`Apply (this._mode =" ")`. 

To avoid an infinite loop when called to the expression `apply ()` to check for in the context of a special 
flag (`_wrap`), which will be exposed when the `apply ()`. 

`` `Js 
block b-inner, default,! this.ctx._wrap: apply ( 
   this._mode = "", 
   this.ctx._wrap = true 
   this.ctx = { 
       block: 'b-wrapper', 
       content: this.ctx 
   } 
) 
`` ` 

* In bem-bl since version 0.3 * added design `applyCtx ()`, which automatically adds the flag of the loop, 
assigns `this.ctx` and apply templates for blank mode: 

`` `Js 
block b-inner, default: applyCtx ({block: 'b-wrapper', content: this.ctx}) 
`` ` 

*** 
** NB ** Construct `applyCtx ()` can be used to replace ** ** BEM-entity in the source tree if you do not use 
the original contents of the block (`this.ctx`) in the argument of `applyCtx ()`. 
*** 

See ** Also ** 

  * [Design applyCtx] (# applyctx) 

<a name="additionbem"> </ a> 

# # # # Add-BEM entities for layout tasks 

# # # # # Problem 

Necessary to impose a block with rounded corners working in all browsers (without using CSS3). 

Input BEMJSON might be: 

`` `Js 
{Block: 'box', content: 'text'} 
`` ` 

The implementation requires the addition of parts to block four additional elements. Since the data elements reflect 
details of HTML-coding, they should not obstruct the input BEM-tree. Add these elements should be at the level of 
BEMHTML-template. The final BEM-tree should look like this: 

`` `Js 
{ 
    block: 'box', 
    content: { 
        elem: 'left-top', 
        content: { 
            elem: 'right-top', 
            content: { 
                elem: 'right-bottom', 
                content: { 
                    elem: 'left-bottom', 
                    content: 'text' 
                } 
            } 
        } 
    } 
} 
`` ` 


# # # # # Solution 

To modify the input BEM-tree at BEMHTML need to write a template for fashion `content` to block `box`. 
The substitution of the fragment input BEM-tree (adding the necessary elements) is performed with the help of a construction `applyCtx ()`, 
and the substitution of the original content - with the help of a construction `applyNext ()`. 

BEMHTML-pattern to perform this conversion: 

`` `Js 
block box, content: applyCtx ({ 
    elem: 'left-top', 
    content: { 
        elem: 'right-top', 
        content: { 
            elem: 'right-bottom', 
            content: { 
                elem: 'left-bottom', 
                content: applyNext () 
            } 
        } 
    } 
}) 
`` ` 

* In bem-bl since version 0.3 * Added a short syntax to use templates for fashion: 

`` `Js 
block b-source, default: apply ("", this.ctx.block = 'b-target') 
`` ` 

See ** Also ** 

  * [The design apply] (# apply) 
  * [Design applyNext] (# applynext) 
  * [Design applyCtx] (# applyctx) 

<a name="use_bem"> </ a> 

# # # # Using the position of BEM-entity 

# # # # # Problem 

Be numbered menu items, starting with 1. The text of each menu item to add it to the serial number 
the point. 

# # # # # Solution 

Use the mechanism for calculating the position of BEM-essence of siblings (the context field `this.position`). 
The input data may look like this: 

`` `Js 
{ 
  block: 'menu', 
  content: [ 
    {Elem: 'item', content: 'aaa'}, 
    {Elem: 'item', content: 'bbb'}, 
    {Elem: 'item', content: 'ccc'}, 
  ] 
} 
`` ` 

To perform the numbering should write a template for fashion `content` to the item to which the element is 
made up of the item number, the separator (the points with a space) and the original text of an item (obtained by 
design `applyNext ()`): 

`` `Js 
block menu { 
  tag: 'ul' 
  elem item { 
    tag: 'li' 
    content: [ 
      this.position, '. ' 
      applyNext () 
    ] 
  } 
} 
`` ` 

See ** Also ** 

  * [Fashion content] (# content) 
  * [Design applyNext] (# applynext) 

<a name="check_predicate"> </ a> 

# # # # Check podpredikatov in a certain order 

# # # # # Problem 

Should be checked podpredikaty pattern in a specific order, for example, first check the availability in the context of 
Object `this.world`, and then check the value of a field in the object `this.world.answer`. 

# # # # # Solution 

We use the fact that podpredikat BEMHTML template can be arbitrary JavaScript-expression, and write it 
in the following form: 
    
`` `Js 
(This.world && this.world.answer === 42) 
`` ` 

The disadvantage of this solution is that when compiling this expression will not be optimized, which will adversely affect 
on speed pattern. In most cases, it is possible and necessary to avoid the need for an orderly inspection 
podpredikatov. 

<a name="binding_html"> </ a> 

# # # # HTML-binding elements by id 

# # # # # Problem 

The need for input block `input` generate your HTML-elements `<label>` and `<input>`, so that the value 
attribute `input @ id` was automatically generated, unique and coincides with the value of the attribute `label @ for`. 

The input data may look like this: 

`` `Js 
{ 
  block: 'input', 
  label: 'My Input', 
  content: 'my value' 
} 
`` ` 

# # # # # Solution 

To generate a unique ID in the appropriate attribute value `id`, use the auxiliary 
function of context `this.generateId ()`. To generate the two HTML-based single element input block 
need two templates: 

  * Template for fashion `tag`, indicating an empty string to cancel the generation of HTML-element for the block, 
    but the process content; 
  * Template for fashion `content`, which will be formed by two essential elements and their attributes. 

`` `Js 
block input { 
  tag:'' 
  content: [ 
    { 
      tag: 'label', 
      attrs: {'for': this.generateId ()}, 
      content: this.ctx.label 
    } 
    { 
      tag: 'input', 
      attrs: { 
        id: this.generateId (), 
        value: this.ctx.content 
      } 
    } 
  ] 
} 
`` ` 

<a id="sources"> </ a> 

# # # Sources 

The collection of video: 
[Http://clubs.ya.ru/bem/posts.xml?tag=64664080] (http://clubs.ya.ru/bem/posts.xml?tag=64664080) 

A story on pYaTnitse about BEMHTML 
[Http://clubs.ya.ru/bem/replies.xml?item_no=898] (http://clubs.ya.ru/bem/replies.xml?item_no=898) 

The story about XJST: 
[Http://clubs.ya.ru/bem/replies.xml?item_no=899] (http://clubs.ya.ru/bem/replies.xml?item_no=899) 

"BEMHTML. Not yet another templating." 
What templating BEMHTML different from hundreds of other templating and why we use it instead. 
[Http://clubs.ya.ru/bem/replies.xml?item_no=1153] (http://clubs.ya.ru/bem/replies.xml?item_no=1153) 
[Http://clubs.ya.ru/bem/replies.xml?item_no=1172] (http://clubs.ya.ru/bem/replies.xml?item_no=1172) 

Template engine that works with multiple levels 
[Http://clubs.ya.ru/bem/replies.xml?item_no=1391] (http://clubs.ya.ru/bem/replies.xml?item_no=1391) 

Preliminary documentation 
[Http://clubs.ya.ru/bem/replies.xml?item_no=992] (http://clubs.ya.ru/bem/replies.xml?item_no=992) 


bem-bl: [http://bem.github.com/bem-bl/index.ru.html] (http://bem.github.com/bem-bl/index.ru.html)
