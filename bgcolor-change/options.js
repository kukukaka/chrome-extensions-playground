// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let page = document.getElementById('buttonDiv');
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement('button');
    button.style.backgroundColor = item;
    button.addEventListener('click', function() {
        let changeColor = document.getElementById('buttonDiv');
            chrome.storage.sync.get('color', function() {
                changeColor.setAttribute('value', item);
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.executeScript(
                        tabs[0].id,
                        {code: 'document.body.style.backgroundColor = "' + item + '";'});
                });
            
        });
    });
    page.appendChild(button);
  }
}
constructOptions(kButtonColors);
