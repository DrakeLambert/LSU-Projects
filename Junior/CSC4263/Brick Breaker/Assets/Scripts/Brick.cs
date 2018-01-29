using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Brick : MonoBehaviour {
	
	void OnCollisionEnter ()
	{
		Destroy(gameObject);
	}
}
