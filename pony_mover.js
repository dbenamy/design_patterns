AbstractCommand = {
  _execute: function($pony, $log) {
    this.$pony = $pony;
    this.$pony.animate(this.doAnimation);
    this.$el = $('<li>' + this.name + '</li>');
    $log.append(this.$el);
  },
  undo: function() {
    this.$pony.animate(this.undoAnimation);
    this.$el.remove();
    this.$el = null;
  }
};

function LeftCommand($pony, $log) {
  this.name = 'left';
  this.doAnimation = {'left': '-=30px'};
  this.undoAnimation = {'left': '+=30px'};
  this._execute.call(this, $pony, $log);
}
LeftCommand.prototype = Object.create(AbstractCommand);
LeftCommand.prototype.constructor = LeftCommand;

function RightCommand($pony, $log) {
  this.name = 'right';
  this.doAnimation = {'left': '+=30px'};
  this.undoAnimation = {'left': '-=30px'};
  this._execute.call(this, $pony, $log);
}
RightCommand.prototype = Object.create(AbstractCommand);
RightCommand.prototype.constructor = RightCommand;

function DownCommand($pony, $log) {
  this.name = 'down';
  this.doAnimation = {'top': '+=30px'};
  this.undoAnimation = {'top': '-=30px'};
  this._execute.call(this, $pony, $log);
}
DownCommand.prototype = Object.create(AbstractCommand);
DownCommand.prototype.constructor = DownCommand;

function UpCommand($pony, $log) {
  this.name = 'up';
  this.doAnimation = {'top': '-=30px'};
  this.undoAnimation = {'top': '+=30px'};
  this._execute.call(this, $pony, $log);
}
UpCommand.prototype = Object.create(AbstractCommand);
UpCommand.prototype.constructor = UpCommand;


function PonyMover($pony, $log) {
  this.$pony = $pony;
  this.$log = $log;

  // Stack of all the commands.
  this.commands = [];
}

PonyMover.prototype.directionToCommandConstructor = {
  'up': UpCommand,
  'down': DownCommand,
  'left': LeftCommand,
  'right': RightCommand
};

PonyMover.prototype.move = function(keyCode) {
  var direction = keyCodeToName[keyCode];
  if (direction) {
    var CmdCtor = this.directionToCommandConstructor[direction];
    var cmd = new CmdCtor(this.$pony, this.$log);
    this.commands.push(cmd);
  }
};

PonyMover.prototype.undo = function() {
  var cmd = this.commands.pop();
  if (cmd) {
    cmd.undo();
  }
};
