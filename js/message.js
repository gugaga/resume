!function(){
  

var view = document.querySelector("section.message");

var model = {
  init:function(){
    var APP_ID = 'gXTE2KfuhfegPN6m6HLUMf7w-gzGzoHsz';
    var APP_KEY = 'wG2XPgd9uOT9Gpr9RDVWX9So';
    AV.init({appId: APP_ID,appKey: APP_KEY});
  },
  fetch:function(){
    var query = new AV.Query('Message');
    return query.find()
  },

  save:function(name,content){
    var Message = AV.Object.extend('Message');
    var message = new Message();
    return message.save({
        'name':name,
        'content': content
      })
  }
}

var controller = {
  view:null,
  messageList:null,
  model:null,
  init:function(view,model){
    this.view = view;
    this.model = model;

    this.messageList = view.querySelector('#messageList')
    this.form = view.querySelector("form");
    this.model.init();
    this.loadMessages()
    this.bindEvents()
  },
  loadMessages:function(){
    this.model.fetch()
    .then(
      (messages) => {
      let array = messages.map((item) => item.attributes)
      console.log(array);
      array.forEach((item) => {
        let li = document.createElement('li');
        li.innerText = `${item.name}: ${item.content}`;
        this.messageList.appendChild(li);
      });
    }
    )
  },bindEvents:function(){
    this.form.addEventListener('submit',(e) => {
      e.preventDefault();
      this.saveMessage()
    })
    
  },
  saveMessage:function(){
    let myForm = this.form;
    let content = myForm.querySelector('input[name=content]').value
    let name = myForm.querySelector('input[name=name]').value

    this.model.save(name,content)
    .then(function(object) {
        let li = document.createElement('li');
        let messageList = document.querySelector('#messageList');
        li.innerText = `${object.attributes.name}: ${object.attributes.content}`;
        messageList.appendChild(li);
        myForm.querySelector('input[name=name]').value = "";
        myForm.querySelector('input[name=content]').value = "";
        var Message = AV.Object.extend('Message');
        console.log(object);
      })
  }

}


controller.init(view,model);

// var TestObject = AV.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.save({
//   words: 'Hello World!'
// }).then(function(object) {
//   alert('LeanCloud Rocks!');
// })



}.call()