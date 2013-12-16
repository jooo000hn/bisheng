$('div.container').append('<h2>Basic Blocks</h2>')

;
(function helper() {
    // return
    Handlebars.registerHelper('link', function(text, url) {
        return new Handlebars.SafeString(
            "<a href='" + url + "'>" + text + "</a>"
        );
    });

    var tpl = Mock.heredoc(function() {
        /*
<div class="entry">
  <h1>{{title}}</h1>
  <div class="body">
    {{#noop}}{{body}}{{/noop}}
  </div>
</div>
        */
    })
    var data = Mock.tpl(tpl)
    doit(data, tpl)

    tasks.push(
        function() {
            data.title = Random.title(1)
        },
        function() {
            data.noop.body = Random.sentence(3, 5)
        },
        function() {
            data.noop = {
                body: Random.sentence(3, 5)
            }
        }
    )
})();

(function helper() {
    // return
    var tpl = Mock.heredoc(function() {
        /*
<div class="entry">
  <h1>{{title}}</h1>
  <div class="body">
    {{#noop}}{{body}}{{/noop}}
  </div>
</div>
        */
    })
    var data = Mock.tpl(tpl, {
        noop: true
    })
    doit(data, tpl)

    tasks.push(
        function() {
            data.title = Random.title(1)
        },
        function() {
            data.body = Random.sentence(3, 5)
        },
        function() {
            data.noop = Random.boolean()
        }
    )
})();

$('div.container').append('<h2>The with helper</h2>')

;
(function helper() {
    // return
    var tpl = Mock.heredoc(function() {
        /*
<div class="entry">
  <h1>{{title}}</h1>
  {{#with story}}
    <div class="intro">{{{intro}}}</div>
    <div class="body">{{{body}}}</div>
  {{/with}}
</div>
        */
    })
    var data = Mock.tpl(tpl)
    doit(data, tpl)

    tasks.push(
        function() {
            data.story = undefined
        },
        function() {
            data.title = Random.title(1)
        },
        function() {
            if (data.story) data.story.intro = Random.sentence(3, 5)
        },
        function() {
            if (data.story) data.story.body = Random.sentence(5, 7)
        },
        function() {
            data.story = {
                intro: Random.sentence(3, 5),
                body: Random.sentence(5, 7)
            }
        }
    )
})();

$('div.container').append('<h2>Simple Iterators</h2>')

;
(function helper() { // TODO 优化数组的更新
    // return
    var tpl = Mock.heredoc(function() {
        /*
<div class="entry">
  <h1>{{title}}</h1>
  {{#with story}}
    <div class="intro">{{{intro}}}</div>
    <div class="body">{{{body}}}</div>
  {{/with}}
</div>
<div class="comments">
  {{#each comments}}
    <div class="comment">
      <h2>{{subject}}</h2>
      {{{body}}}
    </div>
  {{/each}}
  {{#unless comments}}
    <h3 class="warning">WARNING: This entry does not have any records!</h3>
  {{/unless}}
</div>
        */
    })
    var data = Mock.tpl(tpl, {
        title: '@TITLE(1)',
        story: {
            intro: '@SENTENCE(3,5)',
            body: '@SENTENCE(5,7)'
        },
        'comments|3': [{
            subject: '@SENTENCE(3,5)',
            body: '@SENTENCE(5,7)'
        }]
    })
    doit(data, tpl)
    tasks.push(
        function() {
            if (data.comments.length < 6) {
                data.comments.push({
                    subject: Random.sentence(3, 5),
                    body: Random.sentence(5, 7)
                })
            }
        },
        function() {
            data.comments.pop()
        }
    )
})()

;
(function helper() { // TODO
    return
    Handlebars.registerHelper('list', function(context, options) {
        var ret = "<ul>";
        for (var i = 0, j = context.length; i < j; i++) {
            ret = ret + "<li>" + options.fn(context[i]) + "</li>";
        }
        return ret + "</ul>";
    });

    var tpl = Mock.heredoc(function() {
        /*
<div>
{{#list nav}}
  <a href="{{url}}">{{title}}</a>
{{/list}}
</div>
        */
    })
    var data = Mock.tpl(tpl, {
        'nav|3': [{
            url: '@URL',
            title: '@TITLE(3,5)'
        }]
    })
    doit(data, tpl)
    tasks.push(
        function() {},
        function() {}
    )
})();