traceTool
=========
It's a tool building for software feature traceability.
It is built by node.js.

ps.

GitHub命令精简教程

Github其实也可以作为文件分享的地方，但是免费空间只有300M，所以不能存放大文件，否则可以成为一个分享资源的下载站，而且非常方便。
常用命令：
<p>git add .   //添加所有的文件到索引</p>
<p>git commit  //向本地源码库提交，会打开默认vi编辑器写 “注释”</p>
<p>git remote add origin git@github.com:viprs/Hello-World.git   //添加远程目标为origin</p>
<p>git push origin master  //把本地源码库push到Github上</p>
<p>git pull origin  master  //从Github上pull到本地源码库</p>
 
<p>注意：（git commit -m 'remove aa.txt' -a  千万不要用-a强制全部提交，一个项目提交几次就占用150M/300M）</p>
<p>例子：新建一个“ProjClean”项目，下面是具体操作步骤。</p>
<p>Global setup:</p>
 <p>Set up git  告诉github你是谁</p>
  <p>git config --global user.name "viprs"</p>
  <p>git config --global user.email xxx@gmail.com</p>
      
<p>Next steps:</p>
  <p>mkdir ProjClean</p>
  <p>cd ProjClean</p>
  <p>git init</p>
  <p>touch README</p>
  <p>git add README</p>
  <p>git commit -m 'first commit'</p>
  <p>git remote add origin https://github.com/viprs/ProjClean.git</p>
  <p>git push -u origin master</p>
      
<p>Existing Git Repo?</p>
  <p>cd existing_git_repo</p>
  <p>git remote add origin https://github.com/viprs/ProjClean.git</p>
  <p>git push -u origin master  //-u 是提示用户名、密码</p>
