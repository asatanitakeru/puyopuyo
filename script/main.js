$(function(){

    //盤面の生成ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
    //ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
    //ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

    var tumo = '<table id = "t_tumo"><tbody>';

    for(var i = 0; i < 3; i++){
        tumo += '<tr>';
        for(var j = 0; j < 6; j++){
            tumo += '<td id = "tumo_'+i+'_'+j+'"></td>';
        }
        tumo += '</tr>';
    }
    tumo +='</tbody></table>';
    $('#tumo').html(tumo);


    var field = '<table id = "t_field"><tbody>';

    for(var i = 0; i < 13; i++){
        field += '<tr>';
        for(var j = 0; j < 6; j++){
            field += '<td id = "field_' +i+'_'+j+'"></td>'; 
        }
        field += '</tr>';
    }
    field += '</tbody></table>';
    $('#field').html(field);

    var next = '<table id = "t_next"><tbody>';

    for(var i = 0; i < 2; i++){
        next += '<tr>';
        for(var j = 0; j < 2; j++){
            next += '<td id = "next_'+i+'_'+j+'"></td>';
        }
        next += '</tr>';
    }
    next += '</tbody></table>';
    $('#next').html(next);


    //初期つもの生成（ネクスト、ネクネクも）-------------------------------------
    //--------------------------------------------------------------------
    //--------------------------------------------------------------------
    var playtumo=[];
    playtumo[0]=Math.floor(Math.random()*4+1);//1~4
    playtumo[1]=Math.floor(Math.random()*4+1);//1~4
    console.log(playtumo);
    var nexttumo=[];
    for(var i = 0; i < 2; i++){
        nexttumo[i] = [];
        for(var j = 0; j < 2; j++){
            nexttumo[i][j] = Math.floor(Math.random()*4+1);
        }
        if(playtumo[0]+playtumo[1]+nexttumo[0][0]+nexttumo[0][1] == 10 && playtumo[0]*playtumo[1]*nexttumo[0][0]*nexttumo[0][1] == 24){
            //初手が4色の場合ネクストをもう一度生成
            console.log("四色");
            i = -1;
            
        }
    }
    var exchange = nexttumo[0][1];nexttumo[0][1] = nexttumo[1][0];nexttumo[1][0] = exchange;//問題があったため入れ替えている
    //つもをセット----------------------------------------------------------
    //--------------------------------------------------------------------
    //--------------------------------------------------------------------
    var tumofield=[];
    for(var i = 0; i < 3; i++){
        tumofield[i] = [];
        for(var j = 0; j < 6; j++){
            tumofield[i][j] = 0;
        }
    }
    tumofield[0][2]=playtumo[0];
    tumofield[1][2]=playtumo[1];
    display(tumofield, "#t_tumo");//つもをセット
    display(nexttumo, "#t_next");//ネクストとネクネクをセット

    //fieldの配列----------------------------------------------------------
    //--------------------------------------------------------------------
    //--------------------------------------------------------------------

    var chainfield = [];//一次元配列の宣言
    for(var i = 0; i < 13; i++){
        chainfield[i] = [];//i番目の配列に配列を代入することで二次元配列にする
        for(var j = 0; j < 6; j++){
                chainfield[i][j] = 0;
        }
    }
    
    
    display(chainfield, "#t_field");

    //つものコントロール-----------------------------------------------------
    //--------------------------------------------------------------------
    //--------------------------------------------------------------------
    var tumo1_i = 1;
    var tumo1_j = 2;
    var tumo2_i = 0;
    var tumo2_j = 2;//つも１とつも２の初期座標
    var tumo_rotation = 0;//つもを右回転させるとプラス１され、左回転させるとマイナス１される
    var key = [];
    key[0] = tumo1_j;key[1] = tumo_rotation;
    console.log("IN the loop tumofiefd = "+tumofield);
    var formal_score = 0;
    var total_score = 0;
    $(window).keydown(function(e){
        console.log(e.keyCode);
        tumo_cntrol(tumo1_i, key, e.keyCode, tumofield);
        console.log("key:"+key);
      });
    //関数定義-------------------------------------------------------------
    //--------------------------------------------------------------------
    //--------------------------------------------------------------------
    //--------------------------------------------------------------------
    //--------------------------------------------------------------------
    function display(array, name){//つもの色を表示させる関数
        $(name).find('tr').each(function(i, elemTr) { // trタグそれぞれに対する処理
            $(elemTr).children().each(function(j, elemTd) { // tdタグそれぞれに対する処理
                $(elemTd).removeClass(); // まずはクラスをすべてなしにする
                switch (array[i][j]) {
                    case 1:
                        $(elemTd).addClass("red"); // 1の時にはstickクラスを割り振る
                        break;
                    case 2:
                        $(elemTd).addClass("blue");
                        break;
                    case 3:
                        $(elemTd).addClass("green");
                        break;
                    case 4:
                        $(elemTd).addClass("yellow");
                        break;
                    default:
                        $(elemTd).addClass("default"); // それ以外の時にはdefaultクラスを割り振る
                }
            })
        });
    }
    //つもを動かす関数------------------------------------------------------
    //--------------------------------------------------------------------
    function tumo_cntrol(tumoi, key_array, keycode, array){
        var tumoj = key_array[0];
        var rotate = key_array[1];
        var puyo1 = array[tumoi][tumoj];
        var puyo2 = array[Math.round(-Math.cos(rotate*Math.PI/2)+1)][Math.round(Math.sin(rotate*Math.PI/2)+tumoj)];//三角関数で適用
        switch(keycode){
            case 37://左方向キー
                console.log("左方向キー");
                if(tumoj-1 < 0 || Math.round(Math.sin(rotate*Math.PI/2)+tumoj-1) < 0){
                    console.log("これ以上左にいかない");
                    break;
                }
                array[tumoi][tumoj] = 0;
                array[Math.round(-Math.cos(rotate*Math.PI/2)+1)][Math.round(Math.sin(rotate*Math.PI/2)+tumoj)] = 0;
                tumoj--;
                console.log("tumoj = " + tumoj);
                array[tumoi][tumoj] = puyo1;
                array[Math.round(-Math.cos(rotate*Math.PI/2)+1)][Math.round(Math.sin(rotate*Math.PI/2)+tumoj)] = puyo2;
                display(array,"#t_tumo");
                key_array[0] = tumoj;
                key_array[1] = rotate;
                break;
            case 39://右方向キー
                console.log("右方向キー");
                if(tumoj+1 > 5 || Math.round(Math.sin(rotate*Math.PI/2)+tumoj+1) > 5){
                    console.log("これ以上右に行けない");
                    break;
                }
                array[tumoi][tumoj] = 0;
                array[Math.round(-Math.cos(rotate*Math.PI/2)+1)][Math.round(Math.sin(rotate*Math.PI/2)+tumoj)] = 0;
                tumoj++;
                console.log("tumoj = " + tumoj);
                array[tumoi][tumoj] = puyo1;
                array[Math.round(-Math.cos(rotate*Math.PI/2)+1)][Math.round(Math.sin(rotate*Math.PI/2)+tumoj)] = puyo2;
                display(array,"#t_tumo");
                key_array[0] = tumoj;
                key_array[1] = rotate;
                break;
            case 40://下方向キー
                console.log("下方向キー");
                put(key_array, array, chainfield);

                console.log("key_array:"+key_array);
                
                break;
            case 90:
                console.log("zキー:左回転");
                rotate--;
                if(rotate<0){
                    rotate=3;
                }
                key_array[1] = rotate;
                rotation(key_array, array, keycode);
                break;
            case 88:
                console.log("xキー:右回転");
                rotate++;
                if(rotate>3){
                    rotate=0;
                }
                key_array[1] = rotate;
                console.log(rotate);
                rotation(key_array, array, keycode);
                break;
        }
    }

    //つもを置く関数--------------------------------------------------------
    //--------------------------------------------------------------------
    function put(key_array, tumo_array, chain_array){
        console.log("put関数読み出された");
        var tumoj = key_array[0];
        var rotate = key_array[1];
        var puyo1 = tumo_array[1][tumoj];//色情報を格納
        var puyo2 = tumo_array[Math.round(-Math.cos(rotate*Math.PI/2)+1)][Math.round(Math.sin(rotate*Math.PI/2)+tumoj)];//色情報を格納
        if(chain_array[0][tumoj] != 0){//置けない時
            console.log("can't put");
            console.log("tumoj = "+tumoj);
            console.log(chain_array[0][tumoj]);
            
            key_array[0] = tumoj;
            key_array[1] = rotate;
            return;
        }else{
        
            if(rotate%4 == 2){//つもが逆さまの時
                for(var i = 1; i < 13; i++){//puyo2を置く処理
                    if(i == 12 && chain_array[i][tumoj] == 0){//一番下まで走査して何も置かれてない時一番下に置く
                        chain_array[i][tumoj] = puyo2;
                    }
                    else if(chain_array[i][tumoj] != 0){//走査した要素にぷよがある時その一つ上にpuyo2をおく
                        chain_array[i-1][tumoj] = puyo2;
                        break;
                    }
                }
                
                if(chain_array[0][tumoj] != 0){//ゴーストにぷよがある時puyo1は消滅
                    console.log("puyo1消滅");
                }else{
                    for(var i = 1; i < 12; i++){
                        if(i == 11 && chain_array[i][tumoj] == 0){
                            chain_array[i][tumoj] = puyo1;//下から1番目まで走査して何も置かれてない時puyo2をおく
                        }
                        else if(chain_array[i][tumoj] != 0){//走査した要素にぷよがある時その一つ上にpuyo1をおく
                            chain_array[i-1][tumoj] = puyo1;
                            break;
                        }
                    }
                }
                display(chain_array, "#t_field");
                chain_scan(chain_array, 1);
                swiching(key_array, tumo_array, nexttumo);//つもの切り替え
            }else{
                for(var i = 1; i < 13; i++){//puyo1を置く処理
                    if(i == 12 && chain_array[i][tumoj] == 0){//一番下まで走査して何も置かれてない時一番下に置く
                        chain_array[i][tumoj] = puyo1;
                    }
                    else if(chain_array[i][tumoj] != 0){//走査した要素にぷよがある時その一つ上にpuyo2をおく
                        chain_array[i-1][tumoj] = puyo1;
                        break;
                    }
                }
                
                if(chain_array[0][Math.round(Math.sin(rotate*Math.PI/2)+tumoj)] != 0){//ゴーストにぷよがある時puyo2は消滅
                    console.log("puyo2消滅");
                }else{
                    for(var i = 1; i < 13; i++){
                        if(i == 12 && chain_array[i][Math.round(Math.sin(rotate*Math.PI/2)+tumoj)] == 0){
                            chain_array[i][Math.round(Math.sin(rotate*Math.PI/2)+tumoj)] = puyo2;//下から1番目まで走査して何も置かれてない時puyo2をおく
                        }
                        else if(chain_array[i][Math.round(Math.sin(rotate*Math.PI/2)+tumoj)] != 0){//走査した要素にぷよがある時その一つ上にpuyo1をおく
                            chain_array[i-1][Math.round(Math.sin(rotate*Math.PI/2)+tumoj)] = puyo2;
                            break;
                        }
                    }
                }
                display(chain_array, "#t_field");
                console.log(chain_array);
                swiching(key_array, tumo_array, nexttumo);//つもの切り替え
                chain_scan(chain_array, 1);
            }
        }
        return;
    }

    //つもを切り替える関数---------------------------------------------------
    //--------------------------------------------------------------------

    function swiching(key_array, tumo_array, next_array){
        var tumoj = key_array[0];
        var rotate = key_array[1];
        tumo_array[1][tumoj] = 0;//前のつも1を消す
        tumo_array[Math.round(-Math.cos(rotate*Math.PI/2)+1)][Math.round(Math.sin(rotate*Math.PI/2)+tumoj)] = 0;//前のつも2を消す

        tumoj = 2;//tumojを初期値に更新
        rotate = 0;//rotateを初期値に戻す
        tumo_array[0][tumoj] = next_array[0][0];//nextからつも1に代入
        tumo_array[1][tumoj] = next_array[1][0];//nextからつも2に代入

        //ネクネクからネクストへ移動
        next_array[0][0] = next_array[0][1];
        next_array[1][0] = next_array[1][1];

        //ネクネクを生成
        next_array[0][1] = Math.floor(Math.random()*4+1);
        next_array[1][1] = Math.floor(Math.random()*4+1);

        display(tumo_array, "#t_tumo");
        display(next_array, "#t_next");
        key_array[0] = tumoj;
        key_array[1] = rotate;
        return;
    }

    //つもを回転させる関数---------------------------------------------------
    //--------------------------------------------------------------------
    function rotation(key_array, tumo_array, keyCode){
        var tumoj = key_array[0];
        var rotate = key_array[1];
        console.log("rotate:"+rotate%4);
        var puyo1 = tumo_array[1][tumoj];
        tumo_array[1][tumoj] = 0;
        if(keyCode == 90){//左回転する前の時のpuyo2
            var puyo2_i = Math.round(-Math.cos((rotate+1)*Math.PI/2)+1);//回転する前のpuyo2のi成分
            var puyo2_j = Math.round(Math.sin((rotate+1)*Math.PI/2)+tumoj);//回転する前のpuyo2のy成分
            var puyo2 = tumo_array[puyo2_i][puyo2_j];
            tumo_array[puyo2_i][puyo2_j] = 0;
        }
        else{//右回転する前の時のpuyo2
            var puyo2_i = Math.round(-Math.cos((rotate-1)*Math.PI/2)+1);//回転する前のpuyo2のi成分
            var puyo2_j = Math.round(Math.sin((rotate-1)*Math.PI/2)+tumoj);//回転する前のpuyo2のy成分
            var puyo2 = tumo_array[puyo2_i][puyo2_j];
            tumo_array[puyo2_i][puyo2_j] = 0;
        }
        if(tumoj == 0 && rotate%4 == 3){//左端の処理
            tumoj = 1;
            tumo_array[1][tumoj] = puyo1;
            tumo_array[1][0] = puyo2;
        }
        else if(tumoj == 5 && rotate%4 == 1){//右端の処理
            tumoj = 4;
            tumo_array[1][tumoj] = puyo1;
            tumo_array[1][5] = puyo2;
        }
        else{//中央の処理
            tumo_array[1][tumoj] = puyo1;
            tumo_array[Math.round(-Math.cos(rotate*Math.PI/2)+1)][Math.round(Math.sin(rotate*Math.PI/2)+tumoj)] = puyo2;
        }
        display(tumo_array, "#t_tumo");
        key_array[0] = tumoj;
        key_array[1] = rotate;
        return;
    }
    //ぷよを走査する関数群---------------------------------------------------
    //--------------------------------------------------------------------
    function chain_scan(chain_array, chain_number){
        console.log("chain_scan : start");
        //var chain_damy_array = chain_array;//chain_arrayをコピーしてchain_damy_arrayを作って、chain_damy_arrayの要素を書き換えるとchain_arrayも書き換わってしまうため不可
        var chain_damy_array = JSON.parse(JSON.stringify(chain_array));//chain_arrayをJSON文字列に変換し、js文字に変換し直すことで値渡しを実現している
        var chain_info = [];
        var info_number = 0;//chain_infoが何行あるかまたはぷよ群が何個あるか
        for(var chaini = 12; chaini > 0; chaini--){
            for(var chainj = 0; chainj < 6; chainj++){
                if(chain_damy_array[chaini][chainj] != 0){
                    chain_info[info_number] = [  chain_damy_array[ chaini ][ chainj ], 1, [ [chaini, chainj] ]  ];
                    scan(chaini, chainj, chain_damy_array, chain_info, info_number);
                    info_number++;
                }
            }
        }
        var exe = [];//chain_infoのいらない情報を落とすための配列
        for(var number_of_chain_info = 0; number_of_chain_info < chain_info.length; number_of_chain_info++){
            if(chain_info[number_of_chain_info][1] < 4){
                exe.push(number_of_chain_info);//いらない情報がある行数を代入
            }
        }
        for(var i=0; i<exe.length; i++){//いらない情報を削除
            chain_info.splice(exe[i]-i, 1);
            info_number--;
        }

        //console.log("chain_info:"+chain_info);
        if(chain_info.length == 0){
            console.log("消えるぷよはない");
            if(formal_score!=0){
                $("#score").text(formal_score);
            }
            $("#total").text(total_score);
            formal_score = 0;
            return;
        }


        //setTimeout(Delete_Tumo(chain_array, chain_info, info_number),1000); //ツモの消失
        //delay(1500).Fall_Tumo(chain_array);
        //setTimeout(Fall_Tumo, 1000, chain_array);//つもの落下
        //非同期処理のあとに実行したい関数があるためDefferredオブジェクトを利用する
        (async function() {
            await new Promise((resolve) => setTimeout(()=> {
                Delete_Tumo(chain_array, chain_info, info_number);
                resolve();
                display_chain_number(chain_info, chain_number);
            }, 200));
            await new Promise((resolve) => setTimeout(()=> {
                Fall_Tumo(chain_array);
                chain_scan(chain_array, chain_number+1);
                resolve();
            }, 200));
            
        })()
        /** var d1 = new $.Deferred();//Defferredのオブジェクトを生成//jquery-1.7.1.minにおそらくバグがあったためDeferredを用いた非同期処理はできない
        setTimeout(function(){
            console.log("Delete_Tumo呼び出し");
            Delete_Tumo(chain_array, chain_info, info_number);
            console.log("Delete_Tumo処理終了");
            d1.resolve();//Defferredオブジェクトのresolveメソッドを実行
            console.log("Fall_Tumo呼び出し可能");
        }, 500);
        d1.promise().then(function(){
            var d2 = new $.Deferred();
            setTimeout(function(){
                console.log("Fall_Tumo呼び出し");
                Fall_Tumo(chain_array);
                d2.resolve();
                console.log("chain_scan呼び出し可能");
            }, 500);
            return d2.promise();
        })
        .then(function(){
            console.log("chain_scan呼び出し");
            chain_scan(chain_array, chain_number++);
        });*/
        
        

        //-------------------------------------------------------------------
        //-------------------------------------------------------------------
        //-------------------------------------------------------------------
        //-------------------------------------------------------------------
        console.log("chain_scan : end");
    }
    function scan(chaini, chainj, chain_damy_array, info_array, info_number){//再帰呼び出しによりぷよの塊を検出
        if(chain_damy_array[chaini][chainj] == 0){//ゼロの塊は走査しない
            return;
        }
        var puyo_color = chain_damy_array[chaini][chainj];
        chain_damy_array[chaini][chainj] = 0;
        if(chainj+1<6 && chain_damy_array[chaini][chainj+1] == puyo_color){//右方向の走査
            info_array[info_number][1] += 1;//連結数の更新
            info_array[info_number][2].push([chaini, chainj+1]);//座標の追加
            scan(chaini, chainj+1, chain_damy_array, info_array, info_number);
        }
        if(chaini+1<13 && chain_damy_array[chaini+1][chainj] == puyo_color){//下方向の走査
            info_array[info_number][1] += 1;//連結数の更新
            info_array[info_number][2].push([chaini+1, chainj]);//座標の追加
            scan(chaini+1, chainj, chain_damy_array, info_array, info_number);
        }
        if(chainj-1>-1 && chain_damy_array[chaini][chainj-1] == puyo_color){//左方向の走査
            info_array[info_number][1] += 1;//連結数の更新
            info_array[info_number][2].push([chaini, chainj-1]);//座標の追加
            scan(chaini, chainj-1, chain_damy_array, info_array, info_number);
        }
        if(chaini-1>0 && chain_damy_array[chaini-1][chainj] == puyo_color){//上方向の走査
            info_array[info_number][1] += 1;//連結数の更新
            info_array[info_number][2].push([chaini-1, chainj]);//座標の追加
            scan(chaini-1, chainj, chain_damy_array, info_array, info_number);
        }

    }

    //ぷよが消える関数------------------------------------------------------
    //--------------------------------------------------------------------
    function Delete_Tumo(board_array, deleted_array, groups_num){
        //board_array:ボードの配列　deleted_array:消されるツモの情報　chain_count:現在の連鎖数　groups_num:消されるグループの数
       
       //console.log("Delete_Tumo : start");

        var length; //連結数
        var i_group,i_length;
        var board_i; //消される部分のi座標取得用
        var board_j; //消される部分のj座標取得用

        for(i_group=0; i_group<groups_num; i_group++){ //連結したグループの数分回す

            length = deleted_array[i_group][1];  //連結数の取得

            for(i_length=0;i_length<length;i_length++){ //取得した連結数分ループを回す

                board_i = deleted_array[i_group][2][i_length][0];  //i座標を取得
                board_j = deleted_array[i_group][2][i_length][1];  //j座標を取得
                
                board_array[board_i][board_j] = 0;  //該当箇所のツモを削除する
            }
        }
        display(board_array, "#t_field"); //画面表示
        //console.log("Delete_Tumo : end");
    }

    //消えたツモを落とす関数------------------------------------------------
    //--------------------------------------------------------------------
    function Fall_Tumo(board_array){
        var i;
        var j;

        var count; //色の個数を記憶するためのもの

        for(i=0;i<6;i++){ //列ごとに見ていく

            var col = []; //列の色情報の保存用

            for(j=0;j<=12;j++){ //一列全体を下から見ていく

                col[j] = board_array[12-j][i]; //色情報の取得
            }
            
            count = 0;
            for(j=0;j<=12;j++){

                if(col[j]!=0){ //色がある部分を更新
                    board_array[12-count][i] = col[j];
                    count++;
                }
            }

            for(count;count<=12;count++){ //色がない部分を更新
                board_array[12-count][i]=0;
            }
        }
        display(board_array, "#t_field"); //画面表示
    }

    //連鎖数と得点を表示-----------------------------------------------------
    //--------------------------------------------------------------------
    function display_chain_number(info_array, chain_number){
        var chain_bonus = [0,8,16,32,64,96,128,160,192,224,256,288,320,352,384,416,448,480,512];
        var renketu_bonus = [0,2,3,4,5,6,7,10];
        var color_bonus = [0,3,6,12,24];

        var puyo_number = 0;//消えるプヨの個数
        var renketu = 0;//総合連結ボーナス
        var color = 0;//いろ数ボーナス
        var color_exi = [];//どの色があるか
        for(var i = 0; i < info_array.length; i++){
            puyo_number += info_array[i][1];
            renketu += renketu_bonus[info_array[i][1] - 4];
            if(color_exi.indexOf(info_array[i][0]) == -1){
                color_exi.push(info_array[i][0]);
            }
        }
        color = color_bonus[color_exi.length-1];
        var score = chain_bonus[chain_number-1] + renketu + color;
        if(score == 0){
            score = 1; 
        }
        score = 10*puyo_number*score;
        total_score += score;
        formal_score += score;
        $("#chain").text(chain_number);
        console.log("score:"+score);
        console.log("total_score:"+total_score);
    }
    
});