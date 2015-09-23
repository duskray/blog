###java相关
-------
####进制转换
```java
int n1 = 14;
//十进制转成十六进制：
Integer.toHexString(n1);
//十进制转成八进制
Integer.toOctalString(n1);
//十进制转成二进制
Integer.toBinaryString(12);

//十六进制转成十进制
Integer.valueOf("FFFF",16).toString();
//十六进制转成二进制
Integer.toBinaryString(Integer.valueOf("FFFF",16));
//十六进制转成八进制
Integer.toOctalString(Integer.valueOf("FFFF",16));

//八进制转成十进制
Integer.valueOf("576",8).toString();
//八进制转成二进制
Integer.toBinaryString(Integer.valueOf("23",8));
//八进制转成十六进制
Integer.toHexString(Integer.valueOf("23",8));

//二进制转十进制
Integer.valueOf("0101",2).toString();
//二进制转八进制
Integer.toOctalString(Integer.parseInt("0101", 2));
//二进制转十六进制
Integer.toHexString(Integer.parseInt("0101", 2));
```

####SimpleDateFormat
```java
public static void main(String[] args) throws ParseException {
  	SimpleDateFormat CeshiFmt0=new SimpleDateFormat("Gyyyy年MM月dd日 HH时mm分ss秒");
        SimpleDateFormat CeshiFmt1=new SimpleDateFormat("yyyy/MM/dd HH:mm");
        SimpleDateFormat CeshiFmt2=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        SimpleDateFormat CeshiFmt3=new SimpleDateFormat("yyyy年MM月dd日 HH时mm分ss秒 E ");
        SimpleDateFormat CeshiFmt4=new SimpleDateFormat("yyyy/MM/dd E");
        SimpleDateFormat CeshiFmt5=new SimpleDateFormat(
                "一年中的第 D 天 ，第w个星期 ，一个月中第W个星期 ，k时 z时区");
        Date now=new Date();
        System.out.println(CeshiFmt0.format(now));
        System.out.println(CeshiFmt1.format(now));
        System.out.println(CeshiFmt2.format(now));
        System.out.println(CeshiFmt3.format(now));
        System.out.println(CeshiFmt4.format(now));
        System.out.println(CeshiFmt5.format(now));
}
```
其结果为
```
公元2010年07月27日 09时19分29秒
2010/07/27 09:19
2010-07-27 09:19:29
2010年07月27日 09时19分29秒 星期二
2010/07/27 星期二
一年中的第 208 天 ，第31个星期 ，一个月中第5个星期 ，9时 CST时区
```

####impleDateFormat日期-时间格式模式参数
	G Era 标志符 Text AD 
	y 年 Year 1996; 96 
	M 年中的月份 Month July; Jul; 07 
	w 年中的周数 Number 27 
	W 月份中的周数 Number 2 
	D 年中的天数 Number 189 
	d 月份中的天数 Number 10 
	F 月份中的星期 Number 2 
	H 一天中的小时数（0-23） Number 0 
	k 一天中的小时数（1-24） Number 24 
	K am/pm 中的小时数（0-11） Number 0 
	h am/pm 中的小时数（1-12） Number 12 
	m 小时中的分钟数 Number 30 
	s 分钟中的秒数 Number 55 
	S 毫秒数 Number 978 
	z 时区 General time zone Pacific Standard Time; PST; GMT-08:00 
	Z 时区 RFC 822 time zone -0800

####Calendar的一般操作 
```java
/* 
 * 演示 Calendar 的一般操作 
 */  
import java.util.Date;  
import java.text.SimpleDateFormat;  
import java.text.DateFormat;  
import java.util.Calendar;  
  
public class Test  
{  
  public Test()  
  {  
  }  
  
  public static void main(String[] args)  
  {  
    // 字符串转换日期格式  
    DateFormat fmtDateTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
    // 得到日期格式对象  
    Date date = fmtDateTime.parse(strDateMake);  
  
    // 完整显示日期时间  
    String str = (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss:SSS")).format(new Date());  
    System.out.println(str);  
  
    // 创建 Calendar 对象  
    Calendar calendar = Calendar.getInstance();  
    // 初始化 Calendar 对象，但并不必要，除非需要重置时间  
    calendar.setTime(new Date());  
  
    // setTime 类似上面一行  
    // Date date = new Date();  
    // calendar.setTime(date);  
  
    // 显示年份  
    int year = calendar.get(Calendar.YEAR);  
    System.out.println("YEAR is = " + String.valueOf(year));  
  
    // 显示月份 (从0开始, 实际显示要加一)  
    int MONTH = calendar.get(Calendar.MONTH);  
    System.out.println("MONTH is = " + (MONTH + 1));  
  
    // 今年的第 N 天  
    int DAY_OF_YEAR = calendar.get(Calendar.DAY_OF_YEAR);  
    System.out.println("DAY_OF_YEAR is = " + DAY_OF_YEAR);  
  
    // 本月第 N 天  
    int DAY_OF_MONTH = calendar.get(Calendar.DAY_OF_MONTH);  
    System.out.println("DAY_OF_MONTH = " + String.valueOf(DAY_OF_MONTH));  
  
    // 3小时以后  
    calendar.add(Calendar.HOUR_OF_DAY, 3);  
    int HOUR_OF_DAY = calendar.get(Calendar.HOUR_OF_DAY);  
    System.out.println("HOUR_OF_DAY + 3 = " + HOUR_OF_DAY);  
  
    // 当前分钟数  
    int MINUTE = calendar.get(Calendar.MINUTE);  
    System.out.println("MINUTE = " + MINUTE);  
  
    // 15 分钟以后  
    calendar.add(Calendar.MINUTE, 15);  
    MINUTE = calendar.get(Calendar.MINUTE);  
    System.out.println("MINUTE + 15 = " + MINUTE);  
  
    // 30分钟前  
    calendar.add(Calendar.MINUTE, -30);  
    MINUTE = calendar.get(Calendar.MINUTE);  
    System.out.println("MINUTE - 30 = " + MINUTE);  
  
    // 格式化显示  
    str = (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss:SS")).format(calendar.getTime());  
    System.out.println(str);  
  
    // 重置 Calendar 显示当前时间  
    calendar.setTime(new Date());  
    str = (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss:SS")).format(calendar.getTime());  
    System.out.println(str);  
  
    // 创建一个 Calendar 用于比较时间  
    Calendar calendarNew = Calendar.getInstance();  
  
    // 设定为 5 小时以前，后者大，显示 -1  
    calendarNew.add(Calendar.HOUR, -5);  
    System.out.println("时间比较：" + calendarNew.compareTo(calendar));  
  
    // 设定7小时以后，前者大，显示 1  
    calendarNew.add(Calendar.HOUR, +7);  
    System.out.println("时间比较：" + calendarNew.compareTo(calendar));  
  
    // 退回 2 小时，时间相同，显示 0  
    calendarNew.add(Calendar.HOUR, -2);  
    System.out.println("时间比较：" + calendarNew.compareTo(calendar));  
  }  
}
```