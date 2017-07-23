// swapdogs.js - A JavaScript "Watch Dogs"-like text animation library
// Author: Abraham Tugalov <priler96@gmail.com>
// Version: v1.0.0
// Url: https://github.com/Priler/swapdogs.js
// License(s): MIT
(function() {

    'use strict';

    // @include raf.js
    !function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self),n.raf=e()}}(function(){return function e(n,t,o){function r(f,u){if(!t[f]){if(!n[f]){var c="function"==typeof require&&require;if(!u&&c)return c(f,!0);if(i)return i(f,!0);var a=new Error("Cannot find module '"+f+"'");throw a.code="MODULE_NOT_FOUND",a}var s=t[f]={exports:{}};n[f][0].call(s.exports,function(e){var t=n[f][1][e];return r(t?t:e)},s,s.exports,e,n,t,o)}return t[f].exports}for(var i="function"==typeof require&&require,f=0;f<o.length;f++)r(o[f]);return r}({1:[function(e,n,t){function o(){}var r=n.exports={};r.nextTick=function(){var e="undefined"!=typeof window&&window.setImmediate,n="undefined"!=typeof window&&window.MutationObserver,t="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(e)return function(e){return window.setImmediate(e)};var o=[];if(n){var r=document.createElement("div"),i=new MutationObserver(function(){var e=o.slice();o.length=0,e.forEach(function(e){e()})});return i.observe(r,{attributes:!0}),function(e){o.length||r.setAttribute("yes","no"),o.push(e)}}return t?(window.addEventListener("message",function(e){var n=e.source;if((n===window||null===n)&&"process-tick"===e.data&&(e.stopPropagation(),o.length>0)){var t=o.shift();t()}},!0),function(e){o.push(e),window.postMessage("process-tick","*")}):function(e){setTimeout(e,0)}}(),r.title="browser",r.browser=!0,r.env={},r.argv=[],r.on=o,r.addListener=o,r.once=o,r.off=o,r.removeListener=o,r.removeAllListeners=o,r.emit=o,r.binding=function(e){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(e){throw new Error("process.chdir is not supported")}},{}],2:[function(e,n,t){(function(t){for(var o=e("performance-now"),r="undefined"==typeof window?t:window,i=["moz","webkit"],f="AnimationFrame",u=r["request"+f],c=r["cancel"+f]||r["cancelRequest"+f],a=0;!u&&a<i.length;a++)u=r[i[a]+"Request"+f],c=r[i[a]+"Cancel"+f]||r[i[a]+"CancelRequest"+f];if(!u||!c){var s=0,d=0,l=[],p=1e3/60;u=function(e){if(0===l.length){var n=o(),t=Math.max(0,p-(n-s));s=t+n,setTimeout(function(){var e=l.slice(0);l.length=0;for(var n=0;n<e.length;n++)if(!e[n].cancelled)try{e[n].callback(s)}catch(t){setTimeout(function(){throw t},0)}},Math.round(t))}return l.push({handle:++d,callback:e,cancelled:!1}),d},c=function(e){for(var n=0;n<l.length;n++)l[n].handle===e&&(l[n].cancelled=!0)}}n.exports=function(e){return u.call(r,e)},n.exports.cancel=function(){c.apply(r,arguments)},n.exports.polyfill=function(){r.requestAnimationFrame=u,r.cancelAnimationFrame=c}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"performance-now":3}],3:[function(e,n,t){(function(e){(function(){var t,o,r;"undefined"!=typeof performance&&null!==performance&&performance.now?n.exports=function(){return performance.now()}:"undefined"!=typeof e&&null!==e&&e.hrtime?(n.exports=function(){return(t()-r)/1e6},o=e.hrtime,t=function(){var e;return e=o(),1e9*e[0]+e[1]},r=t()):Date.now?(n.exports=function(){return Date.now()-r},r=Date.now()):(n.exports=function(){return(new Date).getTime()-r},r=(new Date).getTime())}).call(this)}).call(this,e("_process"))},{_process:1}]},{},[2])(2)});

    // Occupy the global variable of SwapDogs
    window.SwapDogs = function(element, options) {
        this.el = element;
        this.extend(this.options, options);

        if( this.options.autoInit )
        {
            // autoinit
            this.start();
        }
    };

    SwapDogs.prototype.el = null;
    SwapDogs.prototype.options = {
        autoInit: false,
        words: [],
        alphabet: "abcdefghijklmnopqrstuvwxyz",
        interval: 4000,
        interval2: 40
    };

    SwapDogs.prototype.extend = function(out)
    {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
        if (!arguments[i])
          continue;

        for (var key in arguments[i]) {
          if (arguments[i].hasOwnProperty(key))
            out[key] = arguments[i][key];
        }
        }

        return out;
    }

    SwapDogs.prototype.getRandStr = function(len, alphabet)
    {
        var i, str = '', alp_len = alphabet.length;
        for(i = 0; i < len; i += 1) {
            str += alphabet[Math.round(Math.random() * (alp_len - 1))];
        }

        return str;
    }

    SwapDogs.prototype.replaceAt = function(str, index, character)
    {
        return str.substr(0, index) + character + str.substr(index+character.length);
    }

    SwapDogs.prototype.nextElementSibling = function(el)
    {
        do { el = el.nextSibling; } while ( el && el.nodeType !== 1 );
        return el;
    }

    SwapDogs.prototype.changeWord = function(el, alphabet, freq, newWord, anim, animInterval)
    {
        var chars = [],
            interval,
            clone = el.nextElementSibling || this.nextElementSibling(el),
            _this = this,
            updWord = function() {
                var rand = _this.getRandStr(newWord.length, alphabet),
                    addChar = (freq - Math.random()) > 0,
                    resStr, char;

                if(addChar) {
                    char = Math.round(Math.random() * (newWord.length - 1));
                    while(chars.indexOf(char) !== -1) {
                        char = Math.round(Math.random() * (newWord.length - 1));
                    }
                    chars.push(char);
                }

                for(var i = 0; i < chars.length; i ++) {
                    rand = _this.replaceAt(rand, chars[i], newWord[chars[i]]);
                }

                el.textContent = rand;
                if(chars.length === newWord.length) {
                    clearInterval(interval);
                }
            };

        if(clone === null) {
            clone = el.cloneNode();
            el.parentNode.insertBefore(clone, el.nextElementSibling || this.nextElementSibling(el));

            clone.classList.add('js-swap-dogs-clone');
            clone.style.position = 'absolute';
            clone.style.left = '-9999px';
        }

        alphabet = alphabet.split('');

        //set final width for element
        clone.innerHTML = newWord;
        el.style.width = clone.offsetWidth + 'px';

        if(anim) {
            interval = setInterval(updWord, animInterval);
        } else {
            el.innerHTML = newWord;
        }
    }

    SwapDogs.prototype.wordsChanger = function(wordEl, words, alphabet, interval, interval2)
    {
        var word_i = 1, prev_t = 0;

        if(wordEl === null) {
            return;
        }

        var _this = this;
        function changeLoop(t) {
            raf(changeLoop);

            if(t - prev_t < interval) {
                return;
            }

            prev_t = t;

            if(word_i >= words.length) {
                word_i = 0;
            }

            _this.changeWord(wordEl, alphabet, 0.5, words[word_i], true, interval2);
            word_i ++;
        }

        this.changeWord(wordEl, alphabet, 0, words[0], false, interval2);

        raf(changeLoop);
    }

    SwapDogs.prototype.start = function()
    {
        this.wordsChanger(
            this.el,
            this.options.words,
            this.options.alphabet,
            this.options.interval,
            this.options.interval2
        );
    }

})();