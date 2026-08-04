import 'package:flutter/material.dart';
import 'package:flutter_floatwing/flutter_floatwing.dart';

void main() {
  runApp(const MaterialApp(home: HomePage(), debugShowCheckedModeBanner: false));
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  Window? floatWin;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("悬浮窗控制")),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: startFloat,
              child: const Text("打开悬浮球"),
            ),
            const SizedBox(height:12),
            ElevatedButton(
              onPressed: stopFloat,
              child: const Text("关闭悬浮球"),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> startFloat() async {
    bool ok = await FlutterFloatwing.requestPermission();
    if(!ok){
      if(mounted) ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content:Text("悬浮权限未开启")));
      return;
    }

    floatWin = await FlutterFloatwing.createWindow(
      id:"float1",
      width:220,
      height:280,
      x:60,
      y:220,
      draggable:true,
      resizable:true,
      child:MaterialApp(
        home:Scaffold(
          backgroundColor:Colors.black87,
          body:Padding(
            padding:const EdgeInsets.all(12),
            child:Column(
              children: [
                const Text("悬浮面板",style:TextStyle(color:Colors.white,fontSize:16)),
                const SizedBox(height:10),
                ElevatedButton(onPressed:()async{await stopFloat();}, child:const Text("关闭窗口"))
              ],
            ),
          ),
        ),
      ),
    );
    await floatWin?.show();
  }

  Future<void> stopFloat()async{
    if(floatWin!=null){
      await floatWin?.close();
      floatWin=null;
    }
  }
}
